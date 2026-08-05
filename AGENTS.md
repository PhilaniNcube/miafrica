# AGENTS.md — MiAfrica

## Commands

- `pnpm dev` — start dev server (Turbopack)
- `pnpm build` — production build
- `pnpm start` — start production server
- `pnpm lint` — run ESLint
- `pnpm typecheck` — run TypeScript type checking
- `pnpm seed` — seed tour data into Payload
- `pnpm generate:types` — generate Payload TypeScript types
- `pnpm generate:importmap` — generate Payload admin import map

## Architecture

- **Next.js 16** App Router with **Cache Components** enabled (`cacheComponents: true`)
- **Payload 3** embedded at `/admin` with Turso (libSQL) database and Cloudflare R2 media storage
- Feature-sliced structure: `src/features/<domain>/` owns queries (`<domain>-queries.ts`) and actions (`<domain>-actions.ts`)
- Pages in `src/app/(frontend)/` compose feature components with `<Suspense>` boundaries
- Payload admin routes in `src/app/(payload)/`

## Conventions

- Queries are `server-only` and wrapped in `cache()` for request deduplication
- Server actions return discriminated unions: `{ ok: true } | { ok: false; error: string }`
- Tour pages use `params.then()` — pages stay synchronous, only data-dependent sections suspend
- `generateStaticParams` pre-builds all published tour pages
- `generateMetadata` awaits params directly (runs before page render)
- Skeletons are sibling exports in the same file as their component
- No comments in code unless explicitly requested

## Content Model

- `tours` — eight tour records (Garden Route, City Tour, Township, Winelands, Goodhope, Safari, Hiking, Whale Watching)
- `media` — R2-backed uploads (images and videos), `alt` required
- `locations` — reusable landmarks referenced in itineraries
- `inquiries` — inquiry-only booking flow, admin-managed status workflow
- `users` — Payload auth for admin access
- Localization configured for English only; fields marked `localized: true` are future-ready