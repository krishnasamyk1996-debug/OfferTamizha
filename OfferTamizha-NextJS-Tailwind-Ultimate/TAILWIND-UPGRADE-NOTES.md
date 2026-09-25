# Tailwind Ultimate upgrade

This package replaces the previous large handwritten storefront/admin CSS files with a Tailwind CSS 4 utility-first design system.

## UI upgrades
- Fully responsive storefront from mobile to ultra-wide screens
- Sticky glass header, mobile drawer, compact search and dark mode
- Hero carousel with controls and responsive aspect ratios
- Category cards, deal cards, wishlist state, sorting and search
- Premium promo/Telegram blocks, trust strip and footer
- Tailwind-powered admin login and control center
- Dashboard metrics, SVG analytics chart, platform progress bars and activity feed
- Deal CRUD form, Cloudinary image upload, banner module and settings panels
- Responsive data table and mobile admin navigation

## Engineering upgrades
- Tailwind CSS 4 + PostCSS
- Next.js 16 App Router + React 19 + strict TypeScript
- Supabase Auth/PostgreSQL/RLS integration retained
- Server-only Cloudinary signing retained
- Security headers, SEO/PWA files and health endpoint retained
- GitHub Actions verification workflow included
- No real secrets are included in the ZIP; use Vercel Environment Variables
