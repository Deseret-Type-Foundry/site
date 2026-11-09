// Deseret entry layout ported from the IDC Deseret Keyman keyboard v1.0
// (keymanapp/keyboards release/i/idc_deseret, MIT License, © N. E. Davis for the Illinois Deseret Consortium).
// Keys are identified by KeyboardEvent.code (physical US-QWERTY position), like Keyman's K_ names,
// so the layout is the same whatever the user's OS layout is.
// Unmapped keys (, . ; ' [ ] - = etc.) pass through unchanged, as in the Keyman source.

export interface Key {
  code: string;
  latin: string; // keycap hint
  lower: string; // unmodified
  upper: string; // Shift
}

// [code, latin, lower, upper]
const R = (rows: [string, string, string, string][]): Key[] =>
  rows.map(([code, latin, lower, upper]) => ({ code, latin, lower, upper }));

export const ROWS: Key[][] = [
  R([
    ['Backquote', '`', '𐐶', '𐐎'], ['Digit1', '1', '𐐹', '𐐑'], ['Digit2', '2', '𐐻', '𐐓'], ['Digit3', '3', '𐐽', '𐐕'],
    ['Digit4', '4', '𐐿', '𐐗'], ['Digit5', '5', '𐑁', '𐐙'], ['Digit6', '6', '𐑃', '𐐛'], ['Digit7', '7', '𐑊', '𐐢'],
    ['Digit8', '8', '𐑌', '𐐤'], ['Digit9', '9', '𐑅', '𐐝'], ['Digit0', '0', '𐑇', '𐐟'],
  ]),
  R([
    ['KeyQ', 'Q', '𐐺', '𐐒'], ['KeyW', 'W', '𐐼', '𐐔'], ['KeyE', 'E', '𐐾', '𐐖'], ['KeyR', 'R', '𐑀', '𐐘'],
    ['KeyT', 'T', '𐑂', '𐐚'], ['KeyY', 'Y', '𐑄', '𐐜'], ['KeyU', 'U', '𐑉', '𐐡'], ['KeyI', 'I', '𐑍', '𐐥'],
    ['KeyO', 'O', '𐑆', '𐐞'], ['KeyP', 'P', '𐑈', '𐐠'],
  ]),
  R([
    ['KeyA', 'A', '𐐨', '𐐀'], ['KeyS', 'S', '𐐩', '𐐁'], ['KeyD', 'D', '𐐪', '𐐂'], ['KeyF', 'F', '𐐫', '𐐃'],
    ['KeyG', 'G', '𐐬', '𐐄'], ['KeyH', 'H', '𐐭', '𐐅'], ['KeyJ', 'J', '𐐮', '𐐆'], ['KeyK', 'K', '𐐯', '𐐇'],
    ['KeyL', 'L', '𐐰', '𐐈'],
  ]),
  R([
    ['KeyZ', 'Z', '𐐱', '𐐉'], ['KeyX', 'X', '𐐲', '𐐊'], ['KeyC', 'C', '𐐳', '𐐋'], ['KeyV', 'V', '𐐴', '𐐌'],
    ['KeyB', 'B', '𐐵', '𐐍'], ['KeyN', 'N', '𐐸', '𐐐'], ['KeyM', 'M', '𐑋', '𐐣'], ['Slash', '/', '𐐷', '𐐏'],
  ]),
];

export const ALL_KEYS: Key[] = ROWS.flat();

/** AltGr layer (Keyman RALT): digits and symbols the Deseret layer displaced, plus dotless i. */
export const ALT: Record<string, [plain: string, shift: string]> = {
  Digit1: ['1', '!'], Digit2: ['2', '@'], Digit3: ['3', '#'], Digit4: ['4', '$'], Digit5: ['5', '%'],
  Digit6: ['6', '^'], Digit7: ['7', '&'], Digit8: ['8', '*'], Digit9: ['9', '('], Digit0: ['0', ')'],
  Slash: ['/', '?'], Backquote: ['`', '~'],
  // Schwa (COMMA, second vowel): Private Use glyphs, U+E00D minuscule / U+E00C capital (per soma's DTF build; the book
  // cites U+E00C). DELIBERATE DIVERGENCE from the Keyman source, which types Latin ı / I here.
  KeyJ: ['\ue00d', '\ue00c'],
};

/** Keywords for AltGr-layer glyphs ([ ] = letters spelling the sound). */
export const ALT_KEYWORDS: Record<string, string> = { KeyJ: 'COMM[A]' };

/** Ligatures: previous glyph + J key. `anyCase` = Shift state of J is ignored. */
export const LIGATURES: { prev: string; out: string; anyCase: boolean }[] = [
  { prev: '𐐱', out: '𐑎', anyCase: false },
  { prev: '𐐉', out: '𐐦', anyCase: true },
  { prev: '𐐭', out: '𐑏', anyCase: false },
  { prev: '𐐅', out: '𐐧', anyCase: true },
];

/**
 * Keywords from Shosted & Davis, *The Deseret Alphabet* (Tables "Vowels and diphthongs" and "Consonants"):
 * vowels use Wells (1982) lexical sets; consonants use a modified version of Pitman (1846) exemplars.
 * Keyed by the CAPITAL glyph; the minuscule shares it. [brackets] mark the letters that spell the sound
 * (rendered underlined). Underlining is our reading of the spelling, not the book's: silent-e
 * digraphs (FACE, PRICE, MULE) underline both the vowel and the final e.
 */
export const KEYWORDS: Record<string, string> = {
  '𐐀': 'FL[EE]CE', '𐐁': 'F[A]C[E]', '𐐂': 'P[A]LM', '𐐃': 'TH[OUGH]T', '𐐄': 'G[OA]T', '𐐅': 'G[OO]SE',
  '𐐆': 'K[I]T', '𐐇': 'DR[E]SS', '𐐈': 'TR[A]P', '𐐉': 'L[O]T', '𐐊': 'STR[U]T', '𐐋': 'F[OO]T',
  '𐐌': 'PR[I]C[E]', '𐐍': 'M[OU]TH', '𐐦': 'CH[OI]CE', '𐐧': 'M[U]L[E]',
  '𐐎': '[W]OO', '𐐏': '[Y]OU', '𐐐': '[H]AY', '𐐑': 'RO[P]E', '𐐒': 'RO[B]E', '𐐓': 'FA[T]E', '𐐔': 'FA[D]E',
  '𐐕': 'CA[TCH]', '𐐖': 'E[DG]E', '𐐗': 'LEE[K]', '𐐘': 'LEA[G]UE', '𐐙': 'SA[F]E', '𐐚': 'SA[V]E',
  '𐐛': '[TH]IN', '𐐜': '[TH]INE', '𐐝': 'HI[SS]', '𐐞': 'HI[S]', '𐐟': 'CA[SH]', '𐐠': 'VI[S]ION',
  '𐐡': '[R]UE', '𐐢': '[L]EAF', '𐐣': 'SEE[M]', '𐐤': 'SEE[N]', '𐐥': 'SI[NG]',
};

/** Keyword for a key (same for the capital and the minuscule). */
export const keywordFor = (k: Key): string => KEYWORDS[k.upper] ?? '';

const BY_CODE = new Map(ALL_KEYS.map((k) => [k.code, k]));

export interface Mods { shift: boolean; alt: boolean }

/**
 * Resolve a keypress against the text before the caret.
 * Returns null if the key is not ours (let the browser handle it), else how many
 * UTF-16 units of preceding text to replace and what to insert.
 */
export function resolve(code: string, mods: Mods, before: string): { remove: number; insert: string } | null {
  if (mods.alt) {
    const a = ALT[code];
    return a ? { remove: 0, insert: mods.shift ? a[1] : a[0] } : null;
  }
  const k = BY_CODE.get(code);
  if (!k) return null;
  if (code === 'KeyJ') {
    for (const l of LIGATURES) {
      if (before.endsWith(l.prev) && (l.anyCase || !mods.shift)) return { remove: l.prev.length, insert: l.out };
    }
  }
  return { remove: 0, insert: mods.shift ? k.upper : k.lower };
}
