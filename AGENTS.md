# OfferTamizha engineering notes

- Framework: Next.js 16 App Router + React 19 + strict TypeScript.
- Do not put Cloudinary API secrets or Supabase secret/service-role keys in client code.
- Public data access is controlled by Supabase RLS. Admin mutations require `is_offer_admin()`.
- Keep `/admin` dynamic and non-indexable.
- Prefer Server Components for future read-heavy pages; keep interactive dashboard widgets in Client Components.
- Validate future write payloads with Zod before sending them to Supabase.
