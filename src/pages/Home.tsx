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
          <div className="hero-tag">
            <div className="tag-art"><Art kind="throw" colour="#2b3a7a" label="" /></div>
            <div className="tag-meta">
              <div><p className="tag-lot">Handloom lot 04</p><p className="tag-name">Cotton throw</p></div>
              <div className="tag-right"><p className="tag-where">Woven in Balaramapuram</p><p className="tag-price">₹2,499</p></div>
            </div>
          </div>
        </div>
        <div className="hero-weave" aria-hidden="true" />
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Start here</h2>
          <Link to="/shop" className="more">See all products →</Link>
        </div>
        <div className="grid">{featured.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </section>

      <section className="blocks">
        <div className="block block-cloth">
          <span className="pill">Pit loom weaves</span>
          <h3>Handloom</h3>
          <p>Towels, throws, runners and napkins with the double gold border. Pure unbleached cotton, dried in sun and washed soft.</p>
          <div className="block-art" aria-hidden="true"><Art kind="towel" colour="#a8322d" label="" fit /></div>
          <Link className="btn btn-gold" to="/shop?cat=handloom">Browse handloom cloth →</Link>
        </div>
        <div className="block block-tea">
          <span className="pill">High elevation crops</span>
          <h3>Tea</h3>
          <p>Black, green and spiced, sold by weight so you can taste before you stock up. Hand-plucked above 5,000 feet.</p>
          <div className="block-art" aria-hidden="true"><Art kind="tea" tint="#1f4a36" label="" fit /></div>
          <Link className="btn btn-gold" to="/shop?cat=tea">Browse mountain teas →</Link>
        </div>
      </section>

      <section className="promises"><div className="promises-in">
        <div><h3><i className="dot red" />Delivery</h3><p>Free across India on orders of ₹999 and above. ₹60 below that.</p></div>
        <div><h3><i className="dot indigo" />Returns</h3><p>Unopened tea and unused cloth can go back within 7 days.</p></div>
        <div><h3><i className="dot green" />Care</h3><p>Every cloth ships with plain washing instructions, written by the weaver.</p></div>
      </div></section>
    </>
  )
}
