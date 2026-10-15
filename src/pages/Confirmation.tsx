import { Link } from 'react-router-dom'
import { useCart } from '../data/cart'
import { rupees } from '../data/products'

export default function Confirmation() {
  const { order } = useCart()
  if (!order) {
    return (
      <section className="section narrow">
        <h1 className="page-title">No recent order</h1>
        <p>Orders from this demo appear here after checkout.</p>
        <Link className="btn btn-ink" to="/shop">Browse the shop</Link>
      </section>
    )
  }
  return (
    <section className="section narrow confirm">
      <div className="kasavu" aria-hidden="true" />
      <h1 className="page-title">Thank you, {order.name.split(' ')[0]}</h1>
      <p className="lede">Your demo order <strong>{order.number}</strong> is placed. A real shop would now send a confirmation to your phone and pack your order.</p>
      <ul className="summary-list">
        {order.lines.map((l, i) => <li key={i}><span>{l.qty} × {l.name}{l.option && <em>{l.option}</em>}</span><span>{rupees(l.total)}</span></li>)}
      </ul>
      <dl className="sums">
        <div><dt>Subtotal</dt><dd>{rupees(order.subtotal)}</dd></div>
        <div><dt>Delivery</dt><dd>{order.shipping === 0 ? 'Free' : rupees(order.shipping)}</dd></div>
        <div className="grand"><dt>Total</dt><dd>{rupees(order.total)}</dd></div>
      </dl>
      <p className="note">Delivering to {order.city}. Payment: {order.payment}. This was a demo, so no money was taken.</p>
      <Link className="btn btn-ink" to="/shop">Keep shopping</Link>
    </section>
  )
}
