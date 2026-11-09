// Single source of truth for families, themes and pricing.
// Prices are PLACEHOLDERS (see README "Open items"). The server must re-price at checkout.

export type Status = 'avail' | 'free' | 'soon';
export type Weight = readonly [value: number, label: string];

export interface Theme {
  bg: string;
  arch: string;
  text: string;
  hi: string;
  accent: string;
  border: string;
  line: string;
  lineMid: string;
  lineSoft: string;
  tint: string;
  logoFilter: string;
  logoBlend: string;
}

/** An OpenType feature, shown on the family page off and on. sample uses minuscules so it renders in the preview fonts. */
export interface Feature {
  tag: string; // OpenType tag, e.g. 'ss01'
  name: string;
  desc: string;
  sample: string;
}

export interface Family {
  slug: string;
  prefix: 'DTF' | 'IDC';
  name: string;
  css: string; // CSS font-family
  style: string;
  status: Status;
  caps: boolean; // font has Deseret capitals (U+10400–10427)
  mins: boolean; // font has Deseret minuscules (U+10428–1044F)
  weights: readonly Weight[];
  heroW: number; // weight used for the card/hero sample
  titleCss?: string; // CSS font-family of a capitals title font that has the SAMPLE_GLYPHS capitals, used for them in place of the minuscules
  cardBg: string;
  fg: string; // glyph colour on cards
  blurb: string;
  note: string; // About page note
  page: boolean; // has its own /typefaces/<slug>/ page and is linked from lists; false = forthcoming notice only
  specimen?: string; // path of the specimen PDF under /public, if one is cleared for the site
  features?: readonly Feature[]; // OpenType features, from the font's dtf.toml
  theme: Theme;
}

const W6: Weight[] = [[100, 'UltraThin'], [200, 'Thin'], [400, 'Normal'], [600, 'SemiBold'], [700, 'Bold'], [900, 'Black']];
const C6: Weight[] = [[200, 'UltraLight'], [300, 'Light'], [400, 'Normal'], [600, 'SemiBold'], [700, 'Bold'], [900, 'Black']];

const GOLD = {
  accent: '#d8b45c',
  border: '#c9a24a',
  line: 'rgba(201,162,74,.5)',
  lineMid: 'rgba(201,162,74,.45)',
  lineSoft: 'rgba(201,162,74,.25)',
  tint: 'rgba(216,180,92,.12)',
  logoFilter: 'invert(1) sepia(1) saturate(3) hue-rotate(5deg) brightness(.85)',
  logoBlend: 'screen',
};

export const FAMILIES: Family[] = [
  {
    slug: 'andrena', page: true, specimen: '/specimens/andrena.pdf', prefix: 'DTF', name: 'Andrena', css: "'DTF Andrena'", style: 'Art Deco', status: 'avail', caps: false, mins: true,
    weights: W6, heroW: 900, titleCss: "'DTF Andrena Title'", cardBg: '#16213e', fg: '#d8a640',
    blurb: 'An Art Deco face for the Deseret alphabet.',
    note: 'A ground-nesting solitary mining bee.',
    features: [
      { tag: 'ss01', name: 'Post-1859 ligatures', desc: '𐐧 and 𐐦 as the later MULE and CHOICE ligatures.', sample: '𐑏 𐑎' },
      { tag: 'ss02', name: 'Pre-1868 long E', desc: '𐐁 in its earlier open form.', sample: '𐐩' },
      { tag: 'ss03', name: 'Aesthetic variants', desc: 'An alternate 𐐦.', sample: '𐑎' },
      { tag: 'tnum', name: 'Tabular figures', desc: 'Digits of one width, for columns of numbers.', sample: '1111 / 4444' },
    ],
    theme: { ...GOLD, bg: '#16213e', arch: '#0d1428', text: '#efe3c4', hi: '#f1dca0' },
  },
  {
    slug: 'augochlora', page: true, specimen: '/specimens/augochlora.pdf', prefix: 'DTF', name: 'Augochlora', css: "'DTF Augochlora'", style: 'Art Deco', status: 'avail', caps: false, mins: true,
    weights: W6, heroW: 900, cardBg: 'radial-gradient(circle at 50% 30%,#2e8f5a,#0e3d29 70%)', fg: '#bff0cc',
    blurb: 'An Art Deco face for the Deseret alphabet.',
    note: 'A metallic green sweat bee.',
    features: [
      { tag: 'ss01', name: 'Alternate ampersand', desc: 'An alternate &.', sample: '&' },
      { tag: 'ss02', name: 'Single-bar dollar sign', desc: '$ with one bar instead of two.', sample: '$' },
      { tag: 'salt', name: 'Stylistic alternates', desc: 'Both of the above at once, for apps with a single alternates switch.', sample: '& $' },
    ],
    theme: { ...GOLD, bg: '#0e3d29', arch: 'radial-gradient(circle at 50% 30%,#2e8f5a,#0a2e1f 70%)', text: '#e6f3e4', hi: '#bff0cc' },
  },
  {
    slug: 'calyptapis', page: true, specimen: '/specimens/calyptapis.pdf', prefix: 'DTF', name: 'Calyptapis', css: "'DTF Calyptapis'", style: 'Slab serif', status: 'avail', caps: false, mins: true,
    weights: C6, heroW: 600, cardBg: '#7d1515', fg: '#f4d6b0',
    blurb: 'A slab serif for the Deseret alphabet.',
    note: 'A genus of fossil bee.',
    theme: { ...GOLD, bg: '#6b1111', arch: '#8a1a1a', text: '#f7e6d4', hi: '#f4d6b0' },
  },
  {
    slug: 'hesperapis', page: true, specimen: '/specimens/hesperapis.pdf', prefix: 'IDC', name: 'Hesperapis', css: "'IDC Hesperapis'", style: 'Text face', status: 'free', caps: true, mins: true,
    weights: [[400, 'Regular']], heroW: 400, cardBg: '#ffffff', fg: '#111111',
    blurb: 'A reproduction of the 1868–69 Russell Bros. typeface, drawn for the Illinois Deseret Consortium.',
    note: 'A genus of solitary bees.  Here, named as “Bee of the West”.',
    theme: {
      bg: '#ffffff', arch: '#f5f2ea', text: '#111111', hi: '#111111', accent: '#7a5c18', border: '#7a5c18',
      line: 'rgba(122,92,24,.5)', lineMid: 'rgba(122,92,24,.45)', lineSoft: 'rgba(122,92,24,.25)', tint: 'rgba(122,92,24,.08)',
      logoFilter: 'none', logoBlend: 'multiply',
    },
  },
  {
    slug: 'sericogaster', page: false, prefix: 'DTF', name: 'Sericogaster', css: "'DTF Sericogaster'", style: 'Forthcoming', status: 'soon', caps: false, mins: true, // stopgap minuscules (scaled capitals); no digits/punctuation yet
    weights: [[400, 'Regular'], [700, 'Bold']], heroW: 700, cardBg: '#3d2447', fg: '#e2c6ea',
    blurb: 'The next family from the foundry, in preparation.',
    note: 'A monotypic genus of Australian bees.',
    theme: { ...GOLD, bg: '#3d2447', arch: '#2c1834', text: '#f1e4f4', hi: '#e2c6ea' },
  },
];

export const bySlug = (slug: string) => FAMILIES.find((f) => f.slug === slug);

export const DEFAULT_THEME: Theme = FAMILIES[0].theme;

export const SAMPLE =
  '𐐜 𐐒𐐋𐐗 𐐉𐐚 𐐣𐐃𐐡𐐣𐐊𐐤. 𐐐𐐶𐐩𐑉𐑁𐐬𐑉, 𐐮𐐻 𐐮𐑆 𐐰𐑌 𐐰𐐺𐑉𐐮𐐾𐑋𐐯𐑌𐐻 𐐱𐑂 𐑄 𐑉𐐯𐐿𐐲𐑉𐐼 𐐱𐑂 𐑄 𐐹𐐨𐐹𐑊 𐐱𐑂 𐐤𐐨𐑁𐐴';

const MIN_OFFSET = 0x28;
const inCaps = (cp: number) => cp >= 0x10400 && cp <= 0x10427;
const inMins = (cp: number) => cp >= 0x10428 && cp <= 0x1044f;
// Private Use variants: capital variants U+E000–E005 pair with minuscules U+E006–E00B; schwa U+E00C (capital) / U+E00D (minuscule).
const puaMin = (cp: number) => (cp >= 0xe000 && cp <= 0xe005 ? cp + 6 : cp === 0xe00c ? 0xe00d : cp);
const puaCap = (cp: number) => (cp >= 0xe006 && cp <= 0xe00b ? cp - 6 : cp === 0xe00d ? 0xe00c : cp);
/** Capitals -> minuscules (U+10400–10427 -> +0x28). Other characters unchanged. */
export const toMin = (s: string) => Array.from(s, (c) => { const cp = c.codePointAt(0)!; return String.fromCodePoint(inCaps(cp) ? cp + MIN_OFFSET : puaMin(cp)); }).join('');
/** Minuscules -> capitals. */
export const toCap = (s: string) => Array.from(s, (c) => { const cp = c.codePointAt(0)!; return String.fromCodePoint(inMins(cp) ? cp - MIN_OFFSET : puaCap(cp)); }).join('');
/** Make a sample string renderable in this face: the preview subsets are minuscule-only; Sericogaster is a stopgap minuscule-only build. */
export const face = (f: Pick<Family, 'caps' | 'mins'>, s: string) => (!f.caps ? toMin(s) : !f.mins ? toCap(s) : s);

export const SAMPLE_GLYPHS = '𐐔𐐓𐐙';
/** The family's DTF glyphs and the CSS font-family to set them in: capitals from its title font if it has one, else face(). */
export const sampleGlyphs = (f: Pick<Family, 'caps' | 'mins' | 'css' | 'titleCss'>) =>
  f.titleCss ? { css: `${f.titleCss},${f.css}`, text: SAMPLE_GLYPHS } : { css: f.css, text: face(f, SAMPLE_GLYPHS) };
// Majuscules on purpose: set in the title-only capitals subset (Andrena-Black-Title.woff2), NOT folded by face().
// Every letter here must exist in that file (see ALLOWED_TITLE in scripts/check-fonts.py).
export const HERO_LINE = '𐐔𐐇𐐝𐐀𐐡𐐇𐐓 𐐓𐐌𐐑 𐐙𐐍𐐤𐐔𐐡𐐀';

export interface Tier {
  key: 'personal' | 'commercial' | 'enterprise';
  name: string;
  desc: string;
  weight: number | null; // dollars per weight
  family: number | null; // dollars per family
}

export const TIERS: Tier[] = [
  { key: 'personal', name: 'Personal', desc: 'Non-commercial projects, one person, desktop use.', weight: 20, family: 80 },
  { key: 'commercial', name: 'Commercial', desc: 'Client and commercial work, up to 5 users, desktop and web.', weight: 50, family: 200 },
  { key: 'enterprise', name: 'Enterprise', desc: 'Unlimited users, apps, broadcast and custom terms.', weight: null, family: null },
];

/** Family price if the whole family is chosen; otherwise min(n × per-weight, family). null = by quote. */
export function priceFor(tier: Tier, nWeights: number, wholeFamily: boolean): number | null {
  if (tier.family == null || tier.weight == null) return null;
  return wholeFamily ? tier.family : Math.min(nWeights * tier.weight, tier.family);
}

/** Cart, checkout, accounts and downloads are off until the storefront exists. Flip to true then. */
export const STOREFRONT_OPEN = false;

export const SHOP_URL = 'https://www.outer-veil.com/'; // The Outer Veil, Provo, Utah: sole seller of stickers and posters
// Preview images are shipped at display size on purpose (1×, real pixels): never replace them with print-resolution art.
export interface Product {
  slug: string;
  kind: 'Sticker' | 'Poster';
  name: string;
  no?: string; // atomic number
  img: string;
  w: number;
  h: number;
  alt: string;
  description: string;
  rot?: number;
  wide?: boolean;
}
export const PRODUCTS: Product[] = [
  { slug: 'periodic-table-poster', kind: 'Poster', name: 'Periodic Table Poster', img: '/assets/pd-sticker.png', w: 520, h: 270, wide: true,
    alt: 'Preview of the periodic table of the elements in the Deseret alphabet',
    description: 'The periodic table of the elements, set in the Deseret alphabet.' },
  { slug: 'plutonium-sticker', kind: 'Sticker', name: 'Plutonium', no: '94', img: '/assets/sticker-pu.png', w: 220, h: 265, rot: -2,
    alt: 'Plutonium sticker', description: 'Plutonium (94) element sticker, lettered in the Deseret alphabet.' },
  { slug: 'uranium-sticker', kind: 'Sticker', name: 'Uranium', no: '92', img: '/assets/sticker-u.png', w: 220, h: 265, rot: 1.5,
    alt: 'Uranium sticker', description: 'Uranium (92) element sticker, lettered in the Deseret alphabet.' },
  { slug: 'silver-sticker', kind: 'Sticker', name: 'Silver', no: '47', img: '/assets/sticker-ag.png', w: 220, h: 265, rot: -1,
    alt: 'Silver sticker', description: 'Silver (47) element sticker, lettered in the Deseret alphabet.' },
];

/** English Wikipedia article for a family's bee genus. */
export const wikiUrl = (f: Pick<Family, 'name'>) => `https://en.wikipedia.org/wiki/${f.name}`;
