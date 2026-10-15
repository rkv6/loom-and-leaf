import { Link } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { Art } from '../components/Art'

export default function Home() {
  const featured = ['bath-towel', 'table-runner', 'munnar-black', 'tea-sampler'].map((id) => PRODUCTS.find((p) => p.id === id)!)
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h1>Cloth woven slowly. Tea picked high.</h1>
          <p>Handloom towels, throws and table linen from Kerala, and loose-leaf tea from the hills above it. Small batches, plainly made.</p>
          <p className="hero-actions">
            <Link className="btn btn-ink" to="/shop?cat=handloom">Shop handloom</Link>
            <Link className="btn btn-line" to="/shop?cat=tea">Shop tea</Link>
          </p>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-frame"><Art kind="throw" colour="#2b3a7a" label="" /></div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Start here</h2>
          <Link to="/shop" className="more">See all products</Link>
        </div>
        <div className="grid">{featured.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </section>

      <section className="split">
        <Link to="/shop?cat=handloom" className="tile">
          <div className="tile-art"><Art kind="towel" colour="#a8322d" label="" /></div>
          <div><h3>Handloom</h3><p>Towels, throws, runners and napkins with the double gold border.</p></div>
        </Link>
        <Link to="/shop?cat=tea" className="tile">
          <div className="tile-art"><Art kind="tea" tint="#5d8a4f" label="" /></div>
          <div><h3>Tea</h3><p>Black, green and spiced, sold by weight so you can taste before you stock up.</p></div>
        </Link>
      </section>

      <section className="section promises">
        <div><h3>Delivery</h3><p>Free across India on orders of ₹999 and above. ₹60 below that.</p></div>
        <div><h3>Returns</h3><p>Unopened tea and unused cloth can go back within 7 days.</p></div>
        <div><h3>Care</h3><p>Every cloth ships with plain washing instructions, written by the weaver.</p></div>
      </section>
    </>
  )
}
