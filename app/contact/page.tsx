import type { Metadata } from 'next'
import LegalPage from '../../components/legal/LegalPage'
export const metadata:Metadata={title:'Contact'}
export default function Page(){return <LegalPage title="Contact OfferTamizha"><p>For deal corrections, partnership enquiries or general support, contact <a className="font-bold text-brand-600" href="mailto:support@offertamizha.com">support@offertamizha.com</a>.</p><p>Please include the deal title and page URL when reporting an expired or incorrect offer.</p></LegalPage>}
