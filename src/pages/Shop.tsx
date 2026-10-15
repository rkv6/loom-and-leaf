import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import { ProductCard } from '../components/ProductCard'

type Sort = 'featured' | 'low' | 'high'

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const cat = params.get('cat') ?? 'all'
  const sort = (params.get('sort') ?? 'featured') as Sort
  const q = params.get('q') ?? ''

  const set = (k: string, v: string) => {
    const next = new URLSearchParams(params)
    if (!v || v === 'all' || v === 'featured') next.delete(k)
    else next.set(k, v)
    setParams(next, { replace: true })
  }

  const items = useMemo(() => {
    let list = PRODUCTS.filter((p) => (cat === 'all' ? true : p.category === cat))
    const needle = q.trim().toLowerCase()
    if (needle) list = list.filter((p) => `${p.name} ${p.short}`.toLowerCase().includes(needle))
    if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price)
    return list
  }, [cat, sort, q])

  const title = cat === 'handloom' ? 'Handloom' : cat === 'tea' ? 'Tea' : 'All products'
  return (
    <section className="section">
      <h1 className="page-title">{title}</h1>
      <div className="toolbar">
        <div className="chips" role="group" aria-label="Category">
          {[['all', 'All'], ['handloom', 'Handloom'], ['tea', 'Tea']].map(([v, l]) => (
            <button key={v} className={`chip${cat === v ? ' on' : ''}`} aria-pressed={cat === v} onClick={() => set('cat', v)}>{l}</button>
          ))}
        </div>
        <label className="search"><span className="sr-only">Search products</span>
          <input type="search" value={q} onChange={(e) => set('q', e.target.value)} placeholder="Search towels, tea, cardamom" />
        </label>
        <label className="sort"><span>Sort</span>
          <select value={sort} onChange={(e) => set('sort', e.target.value)}>
            <option value="featured">Featured</option>
            <option value="low">Price, low to high</option>
            <option value="high">Price, high to low</option>
          </select>
        </label>
      </div>
      {items.length === 0 ? (
        <div className="empty"><p>No products match "{q}".</p><button className="btn btn-line" onClick={() => setParams({}, { replace: true })}>Clear search and filters</button></div>
      ) : (
        <div className="grid">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      )}
    </section>
  )
}
