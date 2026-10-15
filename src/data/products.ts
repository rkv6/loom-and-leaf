// Everything here is invented for the concept. Replace with real products and photos for a client.
export type Category = 'handloom' | 'tea'
export type ArtKind = 'towel' | 'handtowels' | 'runner' | 'cushion' | 'throw' | 'napkins' | 'apron' | 'tea' | 'sampler'

export const COLOURS = [
  { id: 'natural', label: 'Natural', hex: '#e6dcc6' },
  { id: 'indigo', label: 'Indigo', hex: '#2b3a7a' },
  { id: 'madder', label: 'Madder red', hex: '#a8322d' },
] as const
export type ColourId = (typeof COLOURS)[number]['id']

export const PACKS = [
  { id: '100g', label: '100 g', factor: 1 },
  { id: '250g', label: '250 g', factor: 2.2 },
] as const
export type PackId = (typeof PACKS)[number]['id']

export interface Product {
  id: string
  name: string
  category: Category
  price: number
  short: string
  description: string
  details: string[]
  art: ArtKind
  tint?: string // tea leaf colour
  colours?: boolean
  packs?: boolean
  stock: number
}

export const PRODUCTS: Product[] = [
  { id: 'bath-towel', name: 'Kasavu-border bath towel', category: 'handloom', price: 799, short: 'Heavy cotton with a gold border', description: 'A thick, quick-drying bath towel woven on a pit loom, finished with the double gold border Kerala cloth is known for.', details: ['100% cotton, 450 gsm', '70 x 140 cm', 'Wash cold with like colours'], art: 'towel', colours: true, stock: 14 },
  { id: 'hand-towels', name: 'Hand towel set of 2', category: 'handloom', price: 549, short: 'Two soft towels for the kitchen or bath', description: 'Two compact towels with a looped weave that dries hands properly. The border is woven in, not printed on.', details: ['100% cotton', '40 x 65 cm each', 'Gets softer with each wash'], art: 'handtowels', colours: true, stock: 22 },
  { id: 'table-runner', name: 'Table runner', category: 'handloom', price: 1199, short: 'Long and narrow, with a border at each end', description: 'A runner that makes a plain table look set for guests. Plain field, gold stripes at both ends.', details: ['100% cotton', '35 x 180 cm', 'Iron while slightly damp'], art: 'runner', colours: true, stock: 8 },
  { id: 'cushion-cover', name: 'Cushion cover', category: 'handloom', price: 649, short: 'A square weave with a bordered edge', description: 'A 45 cm cover with a concealed zip. The woven border frames the square the way it frames a sari.', details: ['100% cotton', '45 x 45 cm', 'Insert not included'], art: 'cushion', colours: true, stock: 18 },
  { id: 'cotton-throw', name: 'Cotton throw', category: 'handloom', price: 2499, short: 'A light throw for the sofa or the bed end', description: 'A large, airy throw with knotted fringe at both ends. Light enough for a Kochi evening, warm enough for a cold AC night.', details: ['100% cotton', '130 x 180 cm', 'Takes about three days to weave'], art: 'throw', colours: true, stock: 2 },
  { id: 'napkin-set', name: 'Napkin set of 4', category: 'handloom', price: 699, short: 'Four napkins with a single gold stripe', description: 'Generous napkins that wash well and iron flat. One stripe along each edge, nothing more.', details: ['100% cotton', '45 x 45 cm each', 'Set of four'], art: 'napkins', colours: true, stock: 25 },
  { id: 'apron', name: 'Kitchen apron', category: 'handloom', price: 899, short: 'A bib apron with one deep pocket', description: 'A sturdy apron with an adjustable neck strap and a pocket sized for a phone and a spoon.', details: ['100% cotton canvas weave', 'One size, adjustable', 'Machine washable'], art: 'apron', colours: true, stock: 0 },
  { id: 'munnar-black', name: 'Munnar black tea', category: 'tea', price: 320, short: 'Strong, malty, made for milk', description: 'A full-bodied black tea from estate-grown leaf. Brews dark in three minutes and holds up to milk and sugar.', details: ['Loose leaf', 'Brew 1 tsp per cup, 3 minutes', 'Best within 6 months'], art: 'tea', tint: '#5b3a29', packs: true, stock: 40 },
  { id: 'green-tea', name: 'Nilgiri-style green tea', category: 'tea', price: 380, short: 'Light, grassy and gently sweet', description: 'A green tea with a clean finish and no bitterness if you keep the water just off the boil.', details: ['Loose leaf', 'Brew 1 tsp at 80 °C, 2 minutes', 'Best within 6 months'], art: 'tea', tint: '#5d8a4f', packs: true, stock: 31 },
  { id: 'masala-chai', name: 'Masala chai blend', category: 'tea', price: 290, short: 'Black tea with ginger, clove and pepper', description: 'The blend for a roadside-style chai at home. Boil it with milk and let it go dark.', details: ['Loose leaf and whole spice', 'Boil 1 tsp per cup with milk', 'Contains ginger, clove, pepper'], art: 'tea', tint: '#9b5a2a', packs: true, stock: 5 },
  { id: 'cardamom-tea', name: 'Cardamom tea', category: 'tea', price: 340, short: 'Black tea with crushed green cardamom', description: 'A fragrant cup that works with or without milk. The cardamom comes from the hills where the tea grows.', details: ['Loose leaf', 'Brew 1 tsp, 4 minutes', 'Contains cardamom'], art: 'tea', tint: '#6d8f3a', packs: true, stock: 19 },
  { id: 'tea-sampler', name: 'Tea sampler box', category: 'tea', price: 899, short: 'Four 50 g tins in one box', description: 'Munnar black, green, masala chai and cardamom, in tins small enough to finish before the leaf gets old.', details: ['4 tins, 50 g each', 'Gift-ready box', 'Best within 6 months'], art: 'sampler', stock: 12 },
]

export const byId = (id: string) => PRODUCTS.find((p) => p.id === id)

export const unitPrice = (p: Product, pack?: PackId) => {
  const f = p.packs ? PACKS.find((x) => x.id === (pack ?? '100g'))!.factor : 1
  return f === 1 ? p.price : Math.round((p.price * f) / 5) * 5
}
export const rupees = (n: number) => `₹${n.toLocaleString('en-IN')}`
export const FREE_SHIPPING_FROM = 999
export const SHIPPING_FEE = 60
