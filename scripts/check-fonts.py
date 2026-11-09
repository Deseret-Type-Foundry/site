#!/usr/bin/env python3
"""Fail if the built site would ship a retail DTF font.

Policy (Neal, 2026-11-09): showing majuscules is fine; shipping the retail font files is not.
Run against the BUILT output (what actually deploys):  python3 scripts/check-fonts.py dist

Rules, for everything under the directory:
  1. Only .woff2 font files are allowed (no .otf/.ttf/.woff/.eot/.zip).
  2. A .woff2 may contain Deseret capitals (U+10400-10427) only if it is IDC Hesperapis (open source, SIL OFL).
  3. DTF preview subsets must stay minuscule-only subsets: at most MAX_GLYPHS glyphs (a full retail font is far larger).
  4. PDFs must not embed a font program for a DTF/IDC family (the specimens draw glyphs as outlines).
Requires: pip install fonttools brotli
"""
import re
import sys
from pathlib import Path

from fontTools.ttLib import TTFont

OPEN = ("IDCHesperapis",)           # families cleared for full publication
MAX_GLYPHS = 120                    # current subsets: ~91-101 glyphs; full fonts are larger
FAMILIES = (b"Andrena", b"Augochlora", b"Calyptapis", b"Sericogaster", b"Hesperapis")
BAD_EXT = {".otf", ".ttf", ".woff", ".eot", ".zip"}

root = Path(sys.argv[1] if len(sys.argv) > 1 else "dist")
if not root.is_dir():
    sys.exit(f"check-fonts: {root} is not a directory (build first)")

problems = []
fonts = pdfs = 0
for p in sorted(root.rglob("*")):
    if not p.is_file():
        continue
    ext = p.suffix.lower()
    rel = p.relative_to(root)
    if ext in BAD_EXT:
        problems.append(f"{rel}: {ext} files must not be shipped")
    elif ext == ".woff2":
        fonts += 1
        font = TTFont(p)
        cmap = font.getBestCmap()
        caps = sum(1 for c in cmap if 0x10400 <= c <= 0x10427)
        if caps and not p.name.startswith(OPEN):
            problems.append(f"{rel}: has {caps} Deseret capitals; only {', '.join(OPEN)} may ship capitals")
        if len(cmap) > MAX_GLYPHS and not p.name.startswith(OPEN):
            problems.append(f"{rel}: {len(cmap)} glyphs > {MAX_GLYPHS}; looks like a full font, not a preview subset")
    elif ext == ".pdf":
        pdfs += 1
        data = p.read_bytes()
        # embedded font programs appear as /FontFile, /FontFile2 or /FontFile3 next to a /FontName
        for m in re.finditer(rb"/FontName\s*/(?:[A-Z]{6}\+)?([A-Za-z0-9_\-]+)", data):
            name = m.group(1)
            if any(f in name for f in FAMILIES):
                problems.append(f"{rel}: embeds font '{name.decode()}' (specimens must use outlines)")
                break

print(f"check-fonts: scanned {fonts} woff2, {pdfs} pdf under {root}")
if problems:
    print("FAIL")
    for line in problems:
        print("  -", line)
    sys.exit(1)
print("OK")
