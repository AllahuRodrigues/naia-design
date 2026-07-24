// Shop configuration for original paintings.
//
// To put an original up for sale: set `priceEUR` to the amount in euros and
// `available` to true. Once it sells, set `available` back to false so the
// "Comprar Original" button disappears from the site.
export interface ShopPainting {
  id: string;
  title: string;
  dimensions: string;
  priceEUR: number | null;
  available: boolean;
}

export const SHOP_PAINTINGS: ShopPainting[] = [
  { id: 'karingana-wa-karingana-2025', title: 'Karingana wa karingana / Era uma vez (2025)', dimensions: '70x50cm', priceEUR: null, available: false },
  { id: 'the-disconnect-2024', title: 'A desconexão / The disconnect (2024)', dimensions: '16x20cm', priceEUR: null, available: false },
  { id: 'quadro-nao-titulado-2025', title: 'Quadro não-titulado / Untitled (2025)', dimensions: '40x50cm', priceEUR: null, available: false },
  { id: 'quadro-nao-titulado-2021', title: 'Quadro não-titulado / Untitled (2021)', dimensions: '50x50cm', priceEUR: null, available: false },
  { id: 'ecos-da-mente-2024', title: 'Ecos da mente / Echoes of the mind (2024)', dimensions: '50x70cm', priceEUR: null, available: false },
  { id: 'a-therapy-session-poseidon-2022', title: 'Uma sessão terapêutica com Poseidon / A therapy session with Poseidon (2022)', dimensions: '30x36cm', priceEUR: null, available: false },
  { id: 'metamorfose-1-2024', title: 'Metamorfose (conjunto) Parte 1 / Metamorphosis (set) Part 1 (2024)', dimensions: '32x40cm', priceEUR: null, available: false },
  { id: 'metamorfose-2-2024', title: 'Metamorfose (conjunto) Parte 2 / Metamorphosis (set) Part 2 (2024)', dimensions: '32x40cm', priceEUR: null, available: false },
  { id: 'can-you-see-it-2021', title: 'Consegues vê-lo? / Can you see it? (2022)', dimensions: '16x20cm', priceEUR: null, available: false },
  { id: '333-2022', title: '33.3 (2022)', dimensions: '16x20cm', priceEUR: null, available: false },
  { id: 'arquitetura-utopica-2025', title: 'Arquitetura utópica (2025)', dimensions: '60x80cm', priceEUR: null, available: false },
  { id: 'sabedoria-e-conjunto-2025', title: 'Sabedoria é... I e II (Conjunto) (2025)', dimensions: '60x60cm (cada)', priceEUR: null, available: false },
  { id: 'raizes-2025', title: 'Raízes (2025)', dimensions: '60x80cm', priceEUR: null, available: false },
];

export function getShopPainting(id: string): ShopPainting | undefined {
  return SHOP_PAINTINGS.find((p) => p.id === id);
}

export function isForSale(id: string): boolean {
  const painting = getShopPainting(id);
  return !!painting && painting.available && painting.priceEUR != null;
}

export type ShippingRegion = 'PT' | 'EU' | 'INTL';

export const SHIPPING_RATES: Record<ShippingRegion, { label: string; amountCents: number }> = {
  PT: { label: 'Portugal', amountCents: 1500 },
  EU: { label: 'União Europeia', amountCents: 3500 },
  INTL: { label: 'Internacional', amountCents: 7000 },
};

// Countries offered at checkout for shipping address collection.
// Add more ISO 3166-1 alpha-2 codes here as needed.
export const ALLOWED_SHIPPING_COUNTRIES: string[] = [
  // Portugal & Portuguese-speaking countries
  'PT', 'BR', 'MZ', 'AO', 'CV', 'GW', 'ST', 'TL',
  // European Union
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR',
  'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'RO', 'SK', 'SI', 'ES', 'SE',
  // Rest of Europe
  'GB', 'CH', 'NO', 'IS',
  // Other major markets
  'US', 'CA', 'AU', 'NZ', 'JP',
];
