# Baby Bloom Boutique

This is the storefront for the Baby Bloom Boutique UI. The experience is built on Vite + React + TypeScript with a Tailwind+shadcn component system, and it showcases baby-care hero cards, curated category grids, product detail layouts, cart logic, Supabase-backed authentication, and an admin dashboard.

## Key features
- Responsive hero layout with hero cards, gradients, and local baby image assets.
- Curated product catalog with badges, pricing helper, and category grid.
- Product detail pages, cart, and user flow through React Router.
- Cart context powered by `@tanstack/react-query`, and Supabase integration for auth/admin areas.
- Shared UI primitives from the shadcn/ui kit plus Radix/Tailwind utilities for refined interaction states.

## Built with
- [Vite](https://vitejs.dev/) (React + TypeScript)
- [Tailwind CSS](https://tailwindcss.com/) (with `tailwindcss-animate` and typography)
- [`@tanstack/react-query`] for async state + caching
- Supabase client (`@supabase/supabase-js`) for auth/data access
- [`framer-motion`, `sonner`, `lucide-react`] for polished visuals and notifications

## Getting started
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Copy the existing `.env` template or confirm your Supabase credentials:
   ```
   VITE_SUPABASE_URL
   VITE_SUPABASE_PROJECT_ID
   VITE_SUPABASE_PUBLISHABLE_KEY
   ```
   These must be set before running the app locally.
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Visit `http://localhost:5173` (or the URL shown in the terminal) to preview the boutique.

## Scripts
- `npm run dev` – start Vite dev server with hot reload.
- `npm run build` – bundle for production with optimized assets.
- `npm run build:dev` – production build using the development mode config.
- `npm run preview` – locally preview the production bundle.
- `npm run lint` – run ESLint across the project.
- `npm run test` – run unit/test suite via Vitest.
- `npm run test:watch` – start Vitest in watch mode.

## Environment variables
| Name | Description |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase project URL that backs auth/data. |
| `VITE_SUPABASE_PROJECT_ID` | Identifier for your Supabase project. |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Public API key used on the client side. |

## Project layout highlights
- `src/pages` – Routes for Index, Catalog, Product, Cart, Auth, Admin, NotFound.
- `src/components` – Shared UI (Hero, Navbar, Footer, ProductCard, CategoryGrid, etc.).
- `src/context` – Cart context provider and helper hooks.
- `src/data/products` – Product catalog/seeding data and helper utilities.
- `src/assets` – Local imagery used in hero + products.

## Next steps
- Hook this UI up to your backend by replacing the seed data in `src/data` and wiring the Supabase client where needed.
- Run `npm run lint` + `npm run test` before releasing so the Tailwind/shadcn conventions stay consistent.
