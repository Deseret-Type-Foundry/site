// Client-side cart (localStorage). Preview only: a server-side cart replaces this at launch,
// and the server re-prices every item at checkout.

export interface CartItem {
  id: number;
  fam: string;
  prefix: string;
  name: string;
  pkg: string;
  weights: number;
  tier: string;
  tierKey: string;
  price: number;
}

const KEY = 'dtf-cart';

export function read(): CartItem[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export function write(items: CartItem[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* storage unavailable (private mode); cart simply won't persist */
  }
}

export const count = () => read().length;
export const money = (n: number) => '$' + n.toFixed(2);
