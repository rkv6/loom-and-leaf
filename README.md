# Loom & Leaf

A concept online store for an invented Kerala shop selling handloom homeware and loose-leaf tea.
Designed and built by rk-studio as a portfolio piece. It is a **demo**: no real orders, no payments.

## What it does
- Home, shop (category filter, search, sort), product pages with colour and pack options
- Cart drawer saved in the browser, stock limits, free delivery over ₹999
- Checkout with validation, then an order confirmation page

## Run it
```
npm install
npm run dev
```

## Make it a real client store
- Replace the drawn product art (`src/components/Art.tsx`) with photos
- Edit products in `src/data/products.ts`
- Add a backend for orders and a payment gateway (for example Razorpay) in place of the demo checkout
