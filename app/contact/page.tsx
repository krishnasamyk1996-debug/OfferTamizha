import type { Metadata } from 'next'
import LegalPage from '../../components/legal/LegalPage'

export const metadata: Metadata = { title: 'Contact' }

export default function Page() {
  return (
    <LegalPage title="Contact OfferTamizha">
      <p>For deal corrections, partnership enquiries or general support, our official OfferTamizha support email will be published here shortly.</p>
      <p>When reporting an incorrect or expired offer, please include the deal title and page URL. Never send card details, UPI PINs, passwords, OTPs or other sensitive payment information.</p>
    </LegalPage>
  )
}
