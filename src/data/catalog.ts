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
  cardBg: string;
  fg: string; // glyph colour on cards
  blurb: string;
  note: string; // About page note
  page: boolean; // has its own /typefaces/<slug>/ page and is linked from lists; false = forthcoming notice only
  specimen?: string; // path of the specimen PDF under /public, if one is cleared for the site
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
    weights: W6, heroW: 900, cardBg: '#16213e', fg: '#d8a640',
    blurb: 'An Art Deco face for the Deseret alphabet, named for the genus of mining bees.',
    note: 'Andrena — lorem ipsum dolor',
    theme: { ...GOLD, bg: '#16213e', arch: '#0d1428', text: '#efe3c4', hi: '#f1dca0' },
  },
  {
    slug: 'augochlora', page: true, specimen: '/specimens/augochlora.pdf', prefix: 'DTF', name: 'Augochlora', css: "'DTF Augochlora'", style: 'Art Deco', status: 'avail', caps: false, mins: true,
    weights: W6, heroW: 900, cardBg: 'radial-gradient(circle at 50% 30%,#2e8f5a,#0e3d29 70%)', fg: '#bff0cc',
    blurb: 'An Art Deco face for the Deseret alphabet, named for the genus of metallic green sweat bees.',
    note: 'Augochlora — lorem ipsum dolor',
    theme: { ...GOLD, bg: '#0e3d29', arch: 'radial-gradient(circle at 50% 30%,#2e8f5a,#0a2e1f 70%)', text: '#e6f3e4', hi: '#bff0cc' },
  },
  {
    slug: 'calyptapis', page: true, specimen: '/specimens/calyptapis.pdf', prefix: 'DTF', name: 'Calyptapis', css: "'DTF Calyptapis'", style: 'Slab serif', status: 'avail', caps: false, mins: true,
    weights: C6, heroW: 900, cardBg: '#7d1515', fg: '#f4d6b0',
    blurb: 'A slab serif for the Deseret alphabet, named for a genus of fossil bee.',
    note: 'Calyptapis — lorem ipsum dolor',
    theme: { ...GOLD, bg: '#6b1111', arch: '#8a1a1a', text: '#f7e6d4', hi: '#f4d6b0' },
  },
  {
    slug: 'hesperapis', page: true, specimen: '/specimens/hesperapis.pdf', prefix: 'IDC', name: 'Hesperapis', css: "'IDC Hesperapis'", style: 'Text face', status: 'free', caps: true, mins: true,
    weights: [[400, 'Regular']], heroW: 400, cardBg: '#ffffff', fg: '#111111',
    blurb: 'Drawn for the Illinois Deseret Consortium. Free to download.',
    note: 'Hesperapis — lorem ipsum dolor',
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
    note: 'Sericogaster — lorem ipsum dolor',
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
export const HERO_LINE = '𐐜 𐐒𐐋𐐗 𐐉𐐚 𐐣𐐃𐐡𐐣𐐊𐐤';

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

export const SHOP_URL = '#'; // TBD: external sticker shop
export const STICKERS = [
  { img: '/assets/sticker-pu.png', alt: 'Plutonium sticker', no: '94', name: 'Plutonium', rot: -2 },
  { img: '/assets/sticker-u.png', alt: 'Uranium sticker', no: '92', name: 'Uranium', rot: 1.5 },
  { img: '/assets/sticker-ag.png', alt: 'Silver sticker', no: '47', name: 'Silver', rot: -1 },
];
