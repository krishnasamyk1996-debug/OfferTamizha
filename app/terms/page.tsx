import type { Metadata } from 'next'
import LegalPage from '../../components/legal/LegalPage'

export const metadata: Metadata = { title: 'Terms & Conditions' }

export default function Page() {
  return (
    <LegalPage title="Terms & Conditions">
      <p className="font-semibold text-slate-700 dark:text-slate-200">Last updated: 25 September 2026</p>
      <h2 className="pt-2 text-lg font-black text-slate-900 dark:text-white">Affiliate deal-discovery service</h2>
      <p>OfferTamizha is a deal-discovery and affiliate-link website. We do not manufacture, stock, sell, resell, ship, deliver or directly fulfill the products displayed on this site.</p>
      <p>When you select a deal, you may be redirected to a third-party merchant website or app. Any purchase, payment, delivery, cancellation, return, refund, warranty or customer-service relationship is between you and that merchant or seller.</p>
      <h2 className="pt-2 text-lg font-black text-slate-900 dark:text-white">Offer information</h2>
      <p>Product descriptions, availability, coupons, seller details, specifications, delivery options and promotional terms can change at any time on the merchant website. The merchant page shown at the time you continue is the controlling source for the transaction.</p>
      <p>OfferTamizha does not guarantee that a displayed offer will remain available, that a coupon will apply, or that a product will meet a particular requirement. Please verify all final details on the merchant website before proceeding.</p>
      <h2 className="pt-2 text-lg font-black text-slate-900 dark:text-white">Third-party responsibility</h2>
      <p>Third-party brand names, logos and product information belong to their respective owners. A link or listing on OfferTamizha does not make OfferTamizha the seller, manufacturer or service provider for that product.</p>
      <h2 className="pt-2 text-lg font-black text-slate-900 dark:text-white">Acceptable use</h2>
      <p>You may use the website for personal deal discovery. Do not attempt to misuse the website, interfere with its operation, scrape protected areas at abusive scale, bypass access controls or access administrative systems without authorization.</p>
      <h2 className="pt-2 text-lg font-black text-slate-900 dark:text-white">Changes</h2>
      <p>We may update these terms when the website, affiliate relationships or operational practices change. The latest version published on this page applies from its stated update date.</p>
    </LegalPage>
  )
}
