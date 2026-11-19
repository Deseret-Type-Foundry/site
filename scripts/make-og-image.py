#!/usr/bin/env python3
"""Render the link-preview card (public/og-image.png, 1200x630) from scripts/og/card.html.

    python3 scripts/make-og-image.py [--browser PATH]

The card mirrors the Home hero. The title is HERO_LINE from src/data/catalog.ts, so the image follows the site.
Needs a Chromium-family browser (Chrome, Chromium, Brave, Edge) and Pillow. Josefin Sans (labels) is loaded from Google
Fonts at render time, as the site does, so this needs network access. The script refuses to write the image unless both
fonts verifiably loaded, so a failed load cannot silently produce a card in fallback fonts.
"""
import argparse, re, subprocess, sys, tempfile
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
W, H = 1200, 630
CANDIDATES = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    "/usr/bin/google-chrome", "/usr/bin/chromium", "/usr/bin/chromium-browser",
]
FLAGS = ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
         "--allow-file-access-from-files", f"--window-size={W},{H}", "--virtual-time-budget=10000"]
# set on <body> once the web fonts are ready: proves the title face and the label face are really in use
PROBE = """<script>
document.fonts.ready.then(() => {
  // document.fonts.check() returns true for a face that FAILED to load, so look at each FontFace's real status.
  const faces = [...document.fonts];
  const loaded = (match, weight) => faces.some(f => f.family.includes(match) && (!weight || f.weight === weight) && f.status === 'loaded');
  const ok = loaded('DTF Andrena Title') && ['300', '400', '600'].every(w => loaded('Josefin Sans', w));
  document.body.dataset.fonts = ok ? 'ok' : 'missing';
  document.body.dataset.faces = JSON.stringify(faces.map(f => [f.family, f.weight, f.status]));
});
</script>"""

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--browser"); a = ap.parse_args()
    browser = a.browser or next((c for c in CANDIDATES if Path(c).exists()), None)
    if not browser:
        sys.exit("no Chromium-family browser found; pass --browser PATH")
    hero = re.search(r"HERO_LINE = '([^']*)'", (ROOT / "src/data/catalog.ts").read_text(encoding="utf-8")).group(1)
    html = (ROOT / "scripts/og/card.html").read_text(encoding="utf-8")
    # as_uri() percent-encodes spaces; an unquoted url() containing spaces silently drops the @font-face
    html = html.replace("{{ROOT}}", ROOT.as_uri()).replace("{{HERO_LINE}}", hero).replace("</body>", PROBE + "</body>")
    with tempfile.TemporaryDirectory() as t:
        page, shot = Path(t) / "card.html", Path(t) / "card.png"
        page.write_text(html, encoding="utf-8")
        dom = subprocess.run([browser, *FLAGS, "--dump-dom", page.as_uri()], capture_output=True, text=True, timeout=120).stdout
        if 'data-fonts="ok"' not in dom:
            import html as _h, json
            m = re.search(r'data-faces="([^"]*)"', dom)
            faces = json.loads(_h.unescape(m.group(1))) if m else "no probe result (page did not finish)"
            sys.exit(f"fonts did not load: refusing to write the image.\nfaces seen by the page (family, weight, status): {faces}")
        subprocess.run([browser, *FLAGS, f"--screenshot={shot}", page.as_uri()], capture_output=True, timeout=120)
        im = Image.open(shot).convert("RGB")
        if im.size != (W, H):
            im = im.crop((0, 0, W, H)) if im.width >= W and im.height >= H else sys.exit(f"unexpected render size {im.size}")
        out = ROOT / "public/og-image.png"
        im.save(out, optimize=True)
    kb = out.stat().st_size / 1024
    print(f"wrote {out.relative_to(ROOT)}  {W}x{H}  {kb:.0f} KB  (title: {hero})")
    if kb > 300:
        print("note: over 300 KB; some apps (WhatsApp) prefer smaller link-preview images", file=sys.stderr)

main()
