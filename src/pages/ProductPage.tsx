import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { byId, COLOURS, PACKS, rupees, unitPrice, PRODUCTS, type ColourId, type PackId } from '../data/products'
import { useCart } from '../data/cart'
import { Art } from '../components/Art'
import { ProductCard, StockBadge } from '../components/ProductCard'

export default function ProductPage() {
  const { id } = useParams()
  const p = byId(id ?? '')
  const { add, setOpen, lines } = useCart()
  const [colour, setColour] = useState<ColourId>('natural')
  const [pack, setPack] = useState<PackId>('100g')
  const [msg, setMsg] = useState('')

  if (!p) {
    return <section className="section"><h1 className="page-title">We couldn't find that product</h1><Link className="btn btn-ink" to="/shop">Back to the shop</Link></section>
  }
  const col = COLOURS.find((c) => c.id === colour)!
  const inCart = lines.filter((l) => l.id === p.id).reduce((s, l) => s + l.qty, 0)
  const left = p.stock - inCart
  const price = unitPrice(p, p.packs ? pack : undefined)
  const related = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4)

  const onAdd = () => {
    const r = add(p.id, { colour: p.colours ? colour : undefined, pack: p.packs ? pack : undefined })
    if (r === 'ok') { setMsg(''); setOpen(true) } else setMsg(`You already have all ${p.stock} we have in your cart.`)
  }

  return (
    <>
      <section className="section pdp">
        <nav className="crumbs" aria-label="Breadcrumb"><Link to="/shop">Shop</Link> / <Link to={`/shop?cat=${p.category}`}>{p.category === 'tea' ? 'Tea' : 'Handloom'}</Link></nav>
        <div className="pdp-grid">
          <div className="pdp-art"><Art kind={p.art} colour={p.colours ? col.hex : undefined} tint={p.tint} label={`${p.name}${p.colours ? ` in ${col.label}` : ''}`} /></div>
          <div className="pdp-info">
            <h1>{p.name}</h1>
            <p className="pdp-price">{rupees(price)}{p.packs && <span> for {PACKS.find((x) => x.id === pack)!.label}</span>}</p>
            <StockBadge p={p} />
            <p className="pdp-desc">{p.description}</p>

            {p.colours && (
              <fieldset className="opt">
                <legend>Colour: {col.label}</legend>
                <div className="swatches">
                  {COLOURS.map((c) => (
                    <label key={c.id} className={`swatch${colour === c.id ? ' on' : ''}`}>
                      <input type="radio" name="colour" checked={colour === c.id} onChange={() => setColour(c.id)} />
                      <span style={{ background: c.hex }} />
                      <em className="sr-only">{c.label}</em>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}
            {p.packs && (
              <fieldset className="opt">
                <legend>Pack size</legend>
                <div className="chips">
                  {PACKS.map((x) => (
                    <label key={x.id} className={`chip${pack === x.id ? ' on' : ''}`}>
                      <input type="radio" name="pack" checked={pack === x.id} onChange={() => setPack(x.id)} />{x.label}
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            <button className="btn btn-ink wide" disabled={left <= 0} onClick={onAdd}>
              {p.stock === 0 ? 'Sold out' : left <= 0 ? 'All in your cart' : 'Add to cart'}
            </button>
            {msg && <p className="note warn" role="status">{msg}</p>}
            <p className="note">Free delivery over ₹999. Returns within 7 days.</p>

            <ul className="details">{p.details.map((d) => <li key={d}>{d}</li>)}</ul>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section-head"><h2>More like this</h2></div>
        <div className="grid">{related.map((r) => <ProductCard key={r.id} p={r} />)}</div>
      </section>
    </>
  )
}
