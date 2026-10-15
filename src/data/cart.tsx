import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { byId, unitPrice, FREE_SHIPPING_FROM, SHIPPING_FEE, type ColourId, type PackId } from './products'

export interface Line { key: string; id: string; colour?: ColourId; pack?: PackId; qty: number }
export interface Order { number: string; placedAt: string; lines: { name: string; option?: string; qty: number; total: number }[]; subtotal: number; shipping: number; total: number; name: string; city: string; payment: string }

interface Ctx {
  lines: Line[]
  count: number
  subtotal: number
  shipping: number
  total: number
  open: boolean
  setOpen: (o: boolean) => void
  add: (id: string, opts: { colour?: ColourId; pack?: PackId }, qty?: number) => 'ok' | 'max'
  setQty: (key: string, qty: number) => void
  remove: (key: string) => void
  clear: () => void
  order: Order | null
  setOrder: (o: Order | null) => void
}
const CartCtx = createContext<Ctx | null>(null)
const KEY = 'loom-leaf-cart-v1'
const ORDER_KEY = 'loom-leaf-order-v1'

const read = <T,>(k: string, fallback: T): T => {
  try { const v = localStorage.getItem(k); return v ? (JSON.parse(v) as T) : fallback } catch { return fallback }
}
const write = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch { /* storage may be blocked */ } }

export const lineKey = (id: string, colour?: ColourId, pack?: PackId) => [id, colour ?? '', pack ?? ''].join('|')

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>(() => read<Line[]>(KEY, []).filter((l) => byId(l.id)))
  const [open, setOpen] = useState(false)
  const [order, setOrderState] = useState<Order | null>(() => read<Order | null>(ORDER_KEY, null))
  useEffect(() => write(KEY, lines), [lines])

  const value = useMemo<Ctx>(() => {
    const priced = lines.map((l) => ({ l, p: byId(l.id)! }))
    const subtotal = priced.reduce((s, { l, p }) => s + unitPrice(p, l.pack) * l.qty, 0)
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE
    return {
      lines, open, setOpen, order,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal, shipping, total: subtotal + shipping,
      add: (id, opts, qty = 1) => {
        const p = byId(id)!
        const key = lineKey(id, opts.colour, opts.pack)
        // Stock is tracked per product, across all its options.
        const inCart = lines.filter((l) => l.id === id).reduce((s, l) => s + l.qty, 0)
        if (inCart + qty > p.stock) return 'max'
        setLines((cur) => {
          const hit = cur.find((l) => l.key === key)
          return hit ? cur.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l)) : [...cur, { key, id, colour: opts.colour, pack: opts.pack, qty }]
        })
        return 'ok'
      },
      setQty: (key, qty) =>
        setLines((cur) => {
          const target = cur.find((l) => l.key === key)
          if (!target) return cur
          const p = byId(target.id)!
          const others = cur.filter((l) => l.id === target.id && l.key !== key).reduce((s, l) => s + l.qty, 0)
          const next = Math.max(0, Math.min(qty, p.stock - others))
          return next === 0 ? cur.filter((l) => l.key !== key) : cur.map((l) => (l.key === key ? { ...l, qty: next } : l))
        }),
      remove: (key) => setLines((cur) => cur.filter((l) => l.key !== key)),
      clear: () => setLines([]),
      setOrder: (o) => { setOrderState(o); write(ORDER_KEY, o) },
    }
  }, [lines, open, order])

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}

export const useCart = () => {
  const c = useContext(CartCtx)
  if (!c) throw new Error('useCart must be used inside CartProvider')
  return c
}
