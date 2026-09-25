import type { Metadata } from 'next'
import LegalPage from '../../components/legal/LegalPage'
export const metadata:Metadata={title:'Affiliate Disclosure'}
export default function Page(){return <LegalPage title="Affiliate Disclosure"><p>Some OfferTamizha links may be affiliate links. If you make a qualifying purchase through one of those links, OfferTamizha may receive a commission at no additional cost to you.</p><p>Affiliate relationships do not guarantee that a listed deal is the lowest price. Compare the final checkout price before purchasing.</p></LegalPage>}
