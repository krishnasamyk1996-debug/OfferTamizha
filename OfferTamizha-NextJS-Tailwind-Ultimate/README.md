# OfferTamizha — Next.js + Tailwind Ultimate

Production-ready OfferTamizha storefront + admin dashboard.

## Stack
- Next.js 16 App Router + React 19 + strict TypeScript
- Tailwind CSS 4 (PostCSS)
- Supabase PostgreSQL + Auth + RLS
- Cloudinary signed uploads through a server-only route
- Vercel-ready deployment
- Biome formatting/linting

## Main routes
- `/` public storefront
- `/admin` protected admin UI
- `/api/health` deployment health check
- `/privacy`, `/terms`, `/affiliate-disclosure`, `/contact`

## Local setup
1. `cp .env.example .env.local`
2. Add Supabase public values.
3. Optional: add Cloudinary server secrets for signed uploads.
4. `npm install`
5. `npm run dev`

## Production
1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Add environment variables from `.env.example` in Vercel.
4. Run `supabase/migrations/0001_core_schema.sql` once if your database is not already prepared.
5. Add a Supabase Auth user and insert that email into `public.admin_users`.
6. Add the custom domain in Vercel and apply the DNS records at your domain registrar.

## Tailwind
This project uses the Tailwind CSS v4 PostCSS workflow (`@tailwindcss/postcss`) and imports Tailwind in `app/globals.css`. There is no legacy `tailwind.config.js` requirement for this setup.
