# MiAfrica — Setup Guide

## Prerequisites

- Node.js 20+
- pnpm (`npm i -g pnpm`)
- A Turso account (free tier available)
- A Cloudflare account with R2 access

## 1. Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

### Turso Database

1. Install the Turso CLI:
   ```bash
   # macOS/Linux
   curl -sSfL https://get.tur.so/install.sh | bash
   # Windows (PowerShell)
   irm https://get.tur.so/install.ps1 | iex
   ```

2. Sign in and create a database:
   ```bash
   turso auth signup
   turso db create miafrica
   ```

3. Get your database URL and auth token:
   ```bash
   turso db show miafrica --url
   turso db tokens create miafrica
   ```

4. Set in `.env`:
   ```
   DATABASE_URL=libsql://miafrica-<your-org>.turso.io
   DATABASE_AUTH_TOKEN=<your-token>
   ```

   For local development without Turso, you can use a local SQLite file:
   ```
   DATABASE_URL=file:./dev.db
   ```

### Cloudflare R2 Storage

1. Go to the Cloudflare dashboard → R2 Object Storage.

2. Create a bucket (e.g. `miafrica-media`).

3. Create an R2 API token:
   - R2 → Manage R2 API Tokens → Create API Token
   - Permissions: Object Read & Write
   - Specify the bucket or allow all buckets
   - Copy the Access Key ID and Secret Access Key

4. Find your Cloudflare Account ID (dashboard → right sidebar or any domain overview).

5. (Optional) Set up a public bucket URL:
   - R2 → your bucket → Settings → Public access
   - Enable a custom domain (e.g. `media.miafrica.co.za`) or use the R2.dev public URL

6. Set in `.env`:
   ```
   R2_ACCOUNT_ID=<your-account-id>
   R2_ACCESS_KEY_ID=<your-access-key>
   R2_SECRET_ACCESS_KEY=<your-secret-key>
   R2_BUCKET_NAME=miafrica-media
   R2_PUBLIC_URL=https://media.miafrica.co.za
   ```

### Payload Secret

Generate a random secret:
```bash
openssl rand -hex 32
```

Set in `.env`:
```
PAYLOAD_SECRET=<your-secret>
```

## 2. Install Dependencies

```bash
pnpm install
```

## 3. Generate Payload Types and Import Map

```bash
pnpm generate:types
pnpm generate:importmap
```

## 4. Create the First Admin User

Start the dev server:
```bash
pnpm dev
```

Navigate to `http://localhost:3000/admin` and create your first admin user.

## 5. Seed Tour Data

With the dev server running (or a local database configured), seed the eight tour records:

```bash
pnpm seed
```

This creates:
- Garden Route (multi-day)
- City Tour Kirstenbosch (day)
- Township Experience — Langa Township (day)
- Cape Winelands (day)
- Goodhope Tour (day)
- Safari (day/flexible)
- Hiking (day/flexible)
- Whale Watching (day)

## 6. Upload Media

1. In the Payload admin (`/admin`), go to the **Media** collection.
2. Upload photos and videos from the MiAfrica media folders.
3. Fill in the `alt` field (required) for each upload.
4. Add optional captions.
5. For videos, set a poster image.
6. Then go to each **Tours** record and attach the appropriate media to `heroMedia` and `gallery`.

## 7. Build for Production

```bash
pnpm build
```

## Deployment (Vercel)

1. Push the project to a Git repository.
2. Import the project in Vercel.
3. Set all environment variables in the Vercel dashboard.
4. Deploy.

### Vercel Environment Variables

| Variable | Description |
|---|---|
| `PAYLOAD_SECRET` | Random string for Payload session encryption |
| `DATABASE_URL` | Turso libSQL URL |
| `DATABASE_AUTH_TOKEN` | Turso auth token |
| `R2_ACCOUNT_ID` | Cloudflare account ID |
| `R2_ACCESS_KEY_ID` | R2 access key |
| `R2_SECRET_ACCESS_KEY` | R2 secret key |
| `R2_BUCKET_NAME` | R2 bucket name |
| `R2_PUBLIC_URL` | Public URL for R2 media |
| `NEXT_PUBLIC_SITE_URL` | Your deployed site URL |

## Architecture

- **CMS**: Payload 3, embedded in Next.js at `/admin`
- **Database**: Turso (libSQL/SQLite), managed via `@payloadcms/db-sqlite`
- **Media Storage**: Cloudflare R2 via a custom S3-compatible adapter
- **Frontend**: Next.js 16 App Router with Cache Components
- **Feature structure**: Domain features under `src/features/` with server-only queries and server actions
- **Localization**: English only initially; Payload localization is configured for future expansion