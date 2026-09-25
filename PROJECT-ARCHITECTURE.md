# OfferTamizha v3 architecture

Browser → Vercel/Next.js → Supabase PostgreSQL

Admin `/admin` → Supabase Auth → RLS-protected tables

Admin image upload → Next.js Route Handler → Cloudinary signed upload → URL stored in Supabase

Public storefront reads active deals, public site settings and active banners. Clicks/page views are stored in analytics tables.

### Styling
Tailwind CSS 4 utility-first design system with responsive layouts, dark-mode variant, semantic brand tokens and minimal global CSS.
