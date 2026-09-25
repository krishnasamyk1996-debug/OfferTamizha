import type { Metadata } from 'next'
import LegalPage from '../../components/legal/LegalPage'
export const metadata:Metadata={title:'Terms & Conditions'}
export default function Page(){return <LegalPage title="Terms & Conditions"><p>Deals, prices, coupons and availability can change at any time on the merchant website. Always verify the final price, seller, delivery estimate and return terms before purchasing.</p><p>OfferTamizha is a deal-discovery service and does not itself fulfill marketplace orders.</p></LegalPage>}
