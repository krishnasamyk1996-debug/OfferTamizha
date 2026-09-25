// Central site settings — single source of truth for all components
// Telegram / Instagram URLs are editable via Admin Panel (localStorage) but fallback to env / defaults here
export const siteSettings = {
  siteName: 'OfferTamizha',
  siteUrl: 'https://offertamizha.com',
  tagline: 'Deals in Tamil • Save More • Live Better',
  telegramUrl: process.env.NEXT_PUBLIC_TELEGRAM_URL || 'https://t.me/OffersTamizha1',
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/offerstamizha/',
  youtubeUrl: process.env.NEXT_PUBLIC_YOUTUBE_URL || 'https://youtube.com/@offertamizha',
  facebookUrl: process.env.NEXT_PUBLIC_FACEBOOK_URL || '#',
  supportEmail: 'support@offertamizha.com',
  description: 'Smart shopping deals from leading Indian marketplaces, curated for Tamil shoppers.',
}

// Helper to get current URLs with localStorage override (admin-edited)
export function getTelegramUrl(): string {
  try {
    const v = localStorage.getItem('ot-telegram-url')
    if (v) return JSON.parse(v) as string
  } catch {}
  return siteSettings.telegramUrl
}
export function getInstagramUrl(): string {
  try {
    const v = localStorage.getItem('ot-instagram-url')
    if (v) return JSON.parse(v) as string
  } catch {}
  return siteSettings.instagramUrl
}
