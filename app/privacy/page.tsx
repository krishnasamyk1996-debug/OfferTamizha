import type { Metadata } from 'next'
import LegalPage from '../../components/legal/LegalPage'

export const metadata: Metadata = { title: 'Privacy Policy' }

export default function Page() {
  return (
    <LegalPage title="Privacy Policy">
      <p className="font-semibold text-slate-700 dark:text-slate-200">Last updated: 25 September 2026</p>
      <h2 className="pt-2 text-lg font-black text-slate-900 dark:text-white">What OfferTamizha does</h2>
      <p>OfferTamizha is an affiliate deal-discovery website. We help visitors discover offers and then direct them to third-party merchant websites or apps. We do not process marketplace orders or collect card, UPI, banking or other checkout credentials.</p>
      <h2 className="pt-2 text-lg font-black text-slate-900 dark:text-white">Information we may process</h2>
      <p>We may process limited technical and usage information such as page views, deal clicks, browser or device information, approximate diagnostics and security logs to operate, protect and improve the website.</p>
      <p>Your wishlist is stored locally in your browser on the device you use. Removing browser storage may remove saved wishlist items.</p>
      <h2 className="pt-2 text-lg font-black text-slate-900 dark:text-white">Third-party services and links</h2>
      <p>Our infrastructure and analytics may use service providers such as Vercel and Supabase. Images may be delivered through Cloudinary. When you follow an affiliate or merchant link, the destination website or app applies its own privacy, cookie and account policies.</p>
      <h2 className="pt-2 text-lg font-black text-slate-900 dark:text-white">Cookies and similar technologies</h2>
      <p>OfferTamizha may use essential storage and limited analytics technologies needed for site functionality, security and performance. Third-party merchants may use their own cookies or tracking after you leave OfferTamizha.</p>
      <h2 className="pt-2 text-lg font-black text-slate-900 dark:text-white">Contact</h2>
      <p>Our official support email will be published on the Contact page. Until then, please use only contact details shown on this website and do not send sensitive payment or identity information.</p>
    </LegalPage>
  )
}
