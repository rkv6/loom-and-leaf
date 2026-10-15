import { useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../data/cart'
import { byId, rupees, unitPrice, COLOURS, PACKS, FREE_SHIPPING_FROM } from '../data/products'
import { Art } from './Art'

export function Header() {
  const { count, setOpen } = useCart()
  return (
    <header className="header">
      <Link to="/" className="logo" aria-label="Loom and Leaf home">Loom <span>&amp;</span> Leaf</Link>
      <nav aria-label="Main" className="nav">
        <NavLink to="/shop?cat=handloom">Handloom</NavLink>
        <NavLink to="/shop?cat=tea">Tea</NavLink>
        <NavLink to="/shop" end>All products</NavLink>
      </nav>
      <button className="cart-btn" onClick={() => setOpen(true)} aria-label={`Open cart, ${count} item${count === 1 ? '' : 's'}`}>
        Cart
        <span className="cart-count" aria-hidden="true">{count}</span>
      </button>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="kasavu" aria-hidden="true" />
      <div className="footer-in">
        <p>Loom &amp; Leaf is an invented shop. This concept store was designed and built by rk-studio.</p>
        <a href="https://portfolio-rkv6.vercel.app" target="_blank" rel="noopener noreferrer">See more work by Rithin K Varghese</a>
      </div>
    </footer>
  )
}

export function CartDrawer() {
  const { open, setOpen, lines, setQty, remove, subtotal, shipping, total } = useCart()
  const nav = useNavigate()
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open, setOpen])

  const toGo = Math.max(0, FREE_SHIPPING_FROM - subtotal)
  return (
    <div className={`drawer-wrap${open ? ' open' : ''}`} aria-hidden={!open}>
      <div className="scrim" onClick={() => setOpen(false)} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="Your cart">
        <div className="drawer-head">
          <h2>Your cart</h2>
          <button ref={closeRef} className="icon-btn" onClick={() => setOpen(false)} aria-label="Close cart" tabIndex={open ? 0 : -1}>✕</button>
        </div>
        {lines.length === 0 ? (
          <div className="drawer-empty">
            <p>Your cart is empty.</p>
            <Link className="btn btn-ink" to="/shop" onClick={() => setOpen(false)}>Browse the shop</Link>
          </div>
        ) : (
          <>
            <p className="ship-note">{toGo > 0 ? `Add ${rupees(toGo)} more for free delivery.` : 'You have free delivery.'}</p>
            <ul className="drawer-lines">
              {lines.map((l) => {
                const p = byId(l.id)!
                const col = COLOURS.find((c) => c.id === l.colour)
                const pack = PACKS.find((x) => x.id === l.pack)
                const opt = [col?.label, pack?.label].filter(Boolean).join(', ')
                return (
                  <li key={l.key} className="line">
                    <div className="line-art"><Art kind={p.art} colour={col?.hex} tint={p.tint} label="" /></div>
                    <div className="line-body">
                      <Link to={`/product/${p.id}`} onClick={() => setOpen(false)} className="line-name">{p.name}</Link>
                      {opt && <span className="line-opt">{opt}</span>}
                      <div className="line-row">
                        <div className="stepper" role="group" aria-label={`Quantity of ${p.name}`}>
                          <button onClick={() => setQty(l.key, l.qty - 1)} aria-label={`Remove one ${p.name}`}>−</button>
                          <output>{l.qty}</output>
                          <button onClick={() => setQty(l.key, l.qty + 1)} aria-label={`Add one ${p.name}`}>+</button>
                        </div>
                        <span className="line-price">{rupees(unitPrice(p, l.pack) * l.qty)}</span>
                      </div>
                      <button className="link-btn" onClick={() => remove(l.key)}>Remove</button>
                    </div>
                  </li>
                )
              })}
            </ul>
            <div className="drawer-foot">
              <dl className="sums">
                <div><dt>Subtotal</dt><dd>{rupees(subtotal)}</dd></div>
                <div><dt>Delivery</dt><dd>{shipping === 0 ? 'Free' : rupees(shipping)}</dd></div>
                <div className="grand"><dt>Total</dt><dd>{rupees(total)}</dd></div>
              </dl>
              <button className="btn btn-ink wide" onClick={() => { setOpen(false); nav('/checkout') }}>Go to checkout</button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
