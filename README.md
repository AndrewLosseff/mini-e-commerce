# DigitalShop

A mini e-commerce UI for digital products (e-books, software licenses, online courses).  
Built with Vue 3, TypeScript, Pinia, Vue Router, PrimeVue (Aura), and Tailwind CSS 4.

---

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173 (or next available port)
```

---

## Available scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Type-check with `vue-tsc`, then bundle with Vite |
| `npm run preview` | Serve the production build locally |
| `npm test` | Run unit tests (Vitest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run coverage` | Generate test coverage report |
| `npm run lint` | Lint and auto-fix with ESLint |
| `npm run lint:check` | Lint without writing changes (good for CI) |
| `npm run format` | Format `src/` with Prettier |
| `npm run format:check` | Check formatting without writing changes |

---

## Pages

| Route | Page | Description |
|---|---|---|
| `/products` | Product List | Browse all products with search, category filter, and sort |
| `/products/:id` | Product Detail | Full product info, reviews, and add to cart |
| `/cart` | Cart | Review items, adjust quantities, mock checkout |
| `/*` | 404 | Catch-all for unknown routes |

---

## Project structure

```
src/
├── assets/
│   └── products.json          Mock product data (source of truth)
│
├── types/
│   └── product.ts             TypeScript interfaces: Product, Review, CartItem
│
├── services/
│   └── productService.ts      Async data layer — wraps products.json with a
│                              simulated 400 ms delay to make loading states visible
│
├── stores/
│   ├── cart.ts                Pinia cart store — add/remove/update qty, subtotal
│   │                          computed, persisted to localStorage
│   └── products.ts            Pinia products store — load-once pattern,
│                              loading/error state
│
├── composables/
│   └── useProductFilters.ts   Filtering and sorting logic extracted from the view:
│                              name search, category multi-select, 4 sort options
│
├── router/
│   └── index.ts               Vue Router route definitions
│
├── components/
│   ├── AppHeader.vue          Sticky nav bar with cart badge
│   ├── ProductCard.vue        Card used in the product grid; includes add/remove cart
│   ├── ProductFilters.vue     Search input + category MultiSelect + clear-all button
│   ├── ProductSkeleton.vue    Placeholder card shown while products load
│   ├── ReviewList.vue         Customer reviews section on the detail page
│   ├── CartLineItem.vue       Single row in the cart (qty stepper + remove)
│   └── ErrorState.vue         Reusable error display with retry callback
│
├── views/
│   ├── ProductListView.vue    Product grid with sidebar filters, sort bar, pagination
│   ├── ProductDetailView.vue  Full product detail + reviews + add to cart
│   ├── CartView.vue           Cart items + order summary + mock checkout
│   └── NotFoundView.vue       404 page
│
├── App.vue                    Root layout: AppHeader + RouterView + Toast + ConfirmDialog
├── main.ts                    App bootstrap — wires Pinia, Vue Router, PrimeVue (Aura)
└── style.css                  Tailwind CSS entry point + mobile toast fix
```

---

## Tech stack

| Concern | Library |
|---|---|
| Framework | Vue 3 — Composition API with `<script setup>` |
| Language | TypeScript 5 (strict mode) |
| Build | Vite 6 |
| Routing | Vue Router 4 |
| State | Pinia 3 |
| UI components | PrimeVue 4 — Aura theme |
| Styling | Tailwind CSS 4 |
| Testing | Vitest 4 + Vue Test Utils |
| Linting | ESLint 10 (`eslint-plugin-vue` flat/recommended + TypeScript recommended) |
| Formatting | Prettier 3 (`semi: false`, `singleQuote: true`, `printWidth: 100`) |

---

## Testing

Unit tests live next to the code they cover:

```
src/stores/__tests__/cart.spec.ts              Cart store — add, remove, update qty,
                                               subtotal, localStorage persistence
src/composables/__tests__/useProductFilters.spec.ts  Filter/sort logic — name search,
                                               category filter, all 4 sort orders
```

Run all tests with coverage:

```bash
npm run coverage
```

---

## Key design decisions

- **`productService.ts` is async** even though it reads local JSON — the 400 ms delay keeps skeleton loaders visible and means the code is ready for a real API with no further changes.
- **Cart state in Pinia + localStorage** — `useCartStore` persists on every mutation so the cart survives page reloads.
- **`useProductFilters` composable** — filter/sort logic is decoupled from the view so it can be unit-tested without mounting a component.
- **Pagination in the view, not the composable** — the composable returns the full filtered list; the view slices it. This keeps the composable simple and its tests exhaustive without pagination concerns.
- **`ProductCard` restructured around `<article>`** — the RouterLink covers only the content area so the "Add to cart" button is a sibling element and never triggers navigation.
