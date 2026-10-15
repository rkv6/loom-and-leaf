import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Header, Footer, CartDrawer } from './components/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductPage from './pages/ProductPage'
import Checkout from './pages/Checkout'
import Confirmation from './pages/Confirmation'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <p className="demo-bar">Demo store: nothing here can be bought and no payment is taken.</p>
      <Header />
      <main id="main">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order" element={<Confirmation />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
