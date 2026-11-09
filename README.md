# deseret.ink — preview site

Astro (static) site for the Deseret Type Foundry. Design reference: `Deseret Type Foundry website.zip` (handoff README + `*.dc.html`).

    npm install
    npm run dev       # http://localhost:4321
    npm run build     # -> dist/

## Status (2026-11-09)
Preview: all pages built; typeface tester, weight waterfall, license/package picker with placeholder pricing,
and a localStorage cart work. **Not live:** checkout, accounts, downloads, contact/notify/newsletter forms
(shown disabled, labelled "Opens at launch"). Licensing/About copy is lorem ipsum. Sticker shop URL is `SHOP_URL` in `src/data/catalog.ts`.

## Keyboard (type pages, under the tester)
`src/components/DeseretKeyboard.astro` — on-screen + physical-key entry into the tester, in the IDC Deseret layout, ported from the
Keyman keyboard `idc_deseret` v1.0 (MIT, © N. E. Davis for the IDC); `src/data/idcKeyboard.ts`. Keycaps show the Latin key,
the glyph in IDC Hesperapis, and the keyword from *The Deseret Alphabet* (Shosted & Davis) with the spelling of the sound underlined.
All 38 letters, the AltGr layer and 4 ligatures were checked against the Keyman `.kmn`, with one deliberate divergence:
AltGr+J types the schwa (PUA: U+E00D minuscule, Shift → U+E00C capital) instead of Latin ı/I. The DTF subsets carry E00D but not E00C; the tester falls back to Hesperapis for missing glyphs (Sericogaster has neither yet); all 40 keywords against `deseret-ms.tex`.
Links out to keyman.com/keyboards/idc_deseret and 2deseret.com (English → Deseret translator).

## Specimens
`public/specimens/<slug>.pdf` (Andrena, Augochlora, Calyptapis, Hesperapis), embedded + downloadable on each type page via `Family.specimen`.
Copied from soma's builds (`~/Fonts/*/…/specimens/`, v1.0; Hesperapis v1.1). They show capitals as drawn outlines; no DTF font file is embedded
(only Georgia/Hiragino/Menlo captions). Policy (Neal): showing majuscules is fine; never ship the retail font files. Sericogaster has no
specimen yet (stopgap minuscules). Re-copy when soma regenerates them.

## Sericogaster
Forthcoming card + About row only (3-glyph, 792-byte `Sericogaster-Bold.woff2` subset ships): `page: false` in `src/data/catalog.ts` means no `/typefaces/sericogaster/` route and no links to it (Home and About list it as a notice).
Its stopgap font files are parked in `_unpublished/fonts/` (gitignored, not shipped). To launch it: set `page: true`, move the files back to `public/fonts/`,
restore its `@font-face` rules in `global.css`, and (when ready) add a specimen.

## Images (preview size only)
Sticker and poster art ships at **display size, 1×** (stickers 220 px wide, home-page thumbnails 90 px, poster `pd-sticker.png` 520 px), never the
print-resolution originals. The guard fails the build if any raster image exceeds 700 px. Originals live outside this repo; resize from them, don't commit them.

## Not linked yet
Licensing, Cart and Account pages are built but unlinked and `noindex` (nav shows Account and Cart disabled). Add-to-cart is off while
`STOREFRONT_OPEN` (src/data/catalog.ts) is false. `/stickers/` redirects to `/products/`.

## Hero title (majuscules)
The Home title is set in capitals from `Andrena-Black-Title.woff2` (soma's cut of Andrena Black: 11 capitals + space, 2,112 bytes), face `DTF Andrena Title`,
falling back to the minuscule `DTF Andrena`. Change the wording in `HERO_LINE` (`src/data/catalog.ts`) only with letters that exist in that file;
the guard allowlist (`ALLOWED_TITLE` in `scripts/check-fonts.py`) must be updated together with a re-cut font. It is the only DTF file allowed to carry capitals.

## Font guard
`scripts/check-fonts.py dist` (also `npm run build && npm run check:fonts`; needs `pip install fonttools brotli`) fails the build/deploy if the
built site ships anything but woff2 fonts, capitals in any face other than IDC Hesperapis, a full-size font in place of a preview subset,
or a PDF that embeds a DTF/IDC font program. CI runs it before the Pages upload, so a failure blocks deploy.

## Hosting: GitHub Pages
`.github/workflows/deploy.yml` builds and deploys on push to `main`; `public/CNAME` = `deseret.ink`.
Repo Settings → Pages → Source: GitHub Actions; DNS: apex A records to GitHub Pages IPs (+ `www` CNAME to `<user>.github.io`); enable Enforce HTTPS.
Pages is static only: the storefront backend (Paddle webhook, signed downloads, contact) needs Workers/Supabase later.

## Fonts (2026-11-09)
`public/fonts/` now holds soma's builds (dtf toolkit 03b4ea6): Andrena, Augochlora, Calyptapis = **minuscule-only** subsets
(40 minuscules + digits/punctuation, no capitals); IDC Hesperapis = the full font (SIL OFL, fine to publish);
Sericogaster = stopgap minuscule-only build (scaled capitals; no digits/punctuation yet). No retail capitals remain in `public/fonts/`.
`Family.caps/mins` in `src/data/catalog.ts` record coverage; `face()` folds sample text to what each face can draw,
and the tester keyboard types minuscules for minuscule-only faces. Retail files are backed up in soma's scratchpad, not in this repo.
