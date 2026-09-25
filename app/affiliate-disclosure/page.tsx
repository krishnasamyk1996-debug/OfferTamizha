import type { Metadata } from 'next'
import LegalPage from '../../components/legal/LegalPage'

export const metadata: Metadata = { title: 'Affiliate Disclosure' }

export default function Page() {
  return (
    <LegalPage title="Affiliate Disclosure">
      <p className="font-semibold text-slate-700 dark:text-slate-200">OfferTamizha is an affiliate deal-discovery website.</p>
      <p>Some or all outbound deal links may be affiliate links. If you click an eligible link and later complete a qualifying action or purchase on the merchant website or app, OfferTamizha may receive a commission from that merchant or affiliate network, generally without an additional charge from OfferTamizha to you.</p>
      <p>OfferTamizha does not directly sell, stock, ship or fulfill the products shown on this website. The merchant or seller is responsible for the product page, order, payment, delivery, cancellation, return, refund, warranty and customer support.</p>
      <p>Product information, availability, coupons, promotions, seller terms and other offer details may change after a link is published. Always review the current merchant page before continuing with a transaction.</p>
      <p>An affiliate relationship does not guarantee availability, suitability, product quality or a particular merchant outcome. Brand names and trademarks remain the property of their respective owners.</p>
      <p className="rounded-2xl border border-orange-200 bg-orange-50 p-4 font-bold text-orange-900 dark:border-orange-900/60 dark:bg-orange-950/30 dark:text-orange-200">By using an outbound deal link, you understand that OfferTamizha may earn an affiliate commission while your transaction takes place on the third-party merchant website or app.</p>
    </LegalPage>
  )
}
