# Live deployment checklist

- [ ] Push this folder to GitHub repository `OfferTamizha`.
- [ ] Import repository in Vercel (Next.js auto-detected).
- [ ] Add `NEXT_PUBLIC_SUPABASE_URL`.
- [ ] Add `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
- [ ] Add `NEXT_PUBLIC_SITE_URL=https://offertamizha.com`.
- [ ] Add `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` for image uploads.
- [ ] In Supabase Auth, create the admin user.
- [ ] Add admin email to `public.admin_users`.
- [ ] Test `/`, `/admin`, `/api/health`.
- [ ] Add the custom domain in Vercel.
- [ ] Copy Vercel DNS records to the domain provider.
- [ ] Verify SSL/HTTPS and both apex + www redirect.
