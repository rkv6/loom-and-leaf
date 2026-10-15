import { Link } from 'react-router-dom'
import { COLOURS, rupees, type Product } from '../data/products'
import { Art } from './Art'

export function StockBadge({ p }: { p: Product }) {
  if (p.stock === 0) return <span className="badge out">Sold out</span>
  if (p.stock <= 5) return <span className="badge low">Only {p.stock} left</span>
  return null
}

export function ProductCard({ p }: { p: Product }) {
  const from = p.packs ? 'From ' : ''
  return (
    <Link to={`/product/${p.id}`} className={`card${p.stock === 0 ? ' is-out' : ''}`}>
      <span className="hole" aria-hidden="true" />
      <div className="card-art">
        <Art kind={p.art} colour={COLOURS[0].hex} tint={p.tint} label={`${p.name}`} />
        <StockBadge p={p} />
      </div>
      <h3>{p.name}</h3>
      <p className="card-short">{p.short}</p>
      <p className="card-price"><span>{from.toLowerCase()}{rupees(p.price)}</span><span className="card-view" aria-hidden="true">View tag</span></p>
    </Link>
  )
}
