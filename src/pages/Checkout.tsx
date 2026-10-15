import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart, type Order } from '../data/cart'
import { byId, COLOURS, PACKS, rupees, unitPrice } from '../data/products'

type Field = 'name' | 'phone' | 'address' | 'city' | 'pin' | 'payment'
const PAY = [
  { id: 'upi', label: 'UPI', hint: 'Pay with any UPI app after we confirm' },
  { id: 'card', label: 'Card', hint: 'Credit or debit card' },
  { id: 'cod', label: 'Cash on delivery', hint: 'Pay the courier when it arrives' },
]

export default function Checkout() {
  const { lines, subtotal, shipping, total, clear, setOrder } = useCart()
  const nav = useNavigate()
  const [v, setV] = useState<Record<Field, string>>({ name: '', phone: '', address: '', city: '', pin: '', payment: 'upi' })
  const [err, setErr] = useState<Partial<Record<Field, string>>>({})

  if (lines.length === 0) {
    return (
      <section className="section narrow">
        <h1 className="page-title">Your cart is empty</h1>
        <p>Add something first, then come back to check out.</p>
        <Link className="btn btn-ink" to="/shop">Browse the shop</Link>
      </section>
    )
  }

  const validate = () => {
    const e: Partial<Record<Field, string>> = {}
    if (v.name.trim().length < 2) e.name = 'Enter your full name.'
    if (!/^[6-9]\d{9}$/.test(v.phone.replace(/\s/g, ''))) e.phone = 'Enter a 10-digit Indian mobile number.'
    if (v.address.trim().length < 6) e.address = 'Enter your street address.'
    if (v.city.trim().length < 2) e.city = 'Enter your city.'
    if (!/^\d{6}$/.test(v.pin)) e.pin = 'Enter a 6-digit PIN code.'
    return e
  }

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault()
    const e = validate()
    setErr(e)
    const first = (Object.keys(e) as Field[])[0]
    if (first) { document.getElementById(`f-${first}`)?.focus(); return }
    const order: Order = {
      number: `LL-${Math.floor(10000 + Math.random() * 89999)}`,
      placedAt: new Date().toISOString(),
      lines: lines.map((l) => {
        const p = byId(l.id)!
        const opt = [COLOURS.find((c) => c.id === l.colour)?.label, PACKS.find((x) => x.id === l.pack)?.label].filter(Boolean).join(', ')
        return { name: p.name, option: opt || undefined, qty: l.qty, total: unitPrice(p, l.pack) * l.qty }
      }),
      subtotal, shipping, total, name: v.name.trim(), city: v.city.trim(), payment: PAY.find((x) => x.id === v.payment)!.label,
    }
    setOrder(order)
    clear()
    nav('/order')
  }

  const input = (f: Field, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div className="fld">
      <label htmlFor={`f-${f}`}>{label}</label>
      <input id={`f-${f}`} value={v[f]} onChange={(e) => setV({ ...v, [f]: e.target.value })} aria-invalid={!!err[f]} aria-describedby={err[f] ? `e-${f}` : undefined} {...props} />
      {err[f] && <p className="err" id={`e-${f}`}>{err[f]}</p>}
    </div>
  )

  return (
    <section className="section checkout">
      <h1 className="page-title">Checkout</h1>
      <div className="co-grid">
        <form onSubmit={onSubmit} noValidate>
          <h2 className="h3">Delivery details</h2>
          {input('name', 'Full name', { autoComplete: 'name' })}
          {input('phone', 'Mobile number', { autoComplete: 'tel', inputMode: 'numeric', placeholder: '10 digits' })}
          {input('address', 'Street address', { autoComplete: 'street-address' })}
          <div className="two">
            {input('city', 'City', { autoComplete: 'address-level2' })}
            {input('pin', 'PIN code', { autoComplete: 'postal-code', inputMode: 'numeric', maxLength: 6 })}
          </div>
          <h2 className="h3">Payment</h2>
          <p className="note">This is a demo. Choosing a method does not take any money.</p>
          <fieldset className="pay">
            <legend className="sr-only">Payment method</legend>
            {PAY.map((m) => (
              <label key={m.id} className={`pay-opt${v.payment === m.id ? ' on' : ''}`}>
                <input type="radio" name="pay" checked={v.payment === m.id} onChange={() => setV({ ...v, payment: m.id })} />
                <span><strong>{m.label}</strong><em>{m.hint}</em></span>
              </label>
            ))}
          </fieldset>
          <button className="btn btn-ink wide" type="submit">Place demo order, {rupees(total)}</button>
        </form>

        <aside className="summary" aria-label="Order summary">
          <h2 className="h3">Your order</h2>
          <ul>
            {lines.map((l) => {
              const p = byId(l.id)!
              const opt = [COLOURS.find((c) => c.id === l.colour)?.label, PACKS.find((x) => x.id === l.pack)?.label].filter(Boolean).join(', ')
              return <li key={l.key}><span>{l.qty} × {p.name}{opt && <em>{opt}</em>}</span><span>{rupees(unitPrice(p, l.pack) * l.qty)}</span></li>
            })}
          </ul>
          <dl className="sums">
            <div><dt>Subtotal</dt><dd>{rupees(subtotal)}</dd></div>
            <div><dt>Delivery</dt><dd>{shipping === 0 ? 'Free' : rupees(shipping)}</dd></div>
            <div className="grand"><dt>Total</dt><dd>{rupees(total)}</dd></div>
          </dl>
        </aside>
      </div>
    </section>
  )
}

