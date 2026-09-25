import type { Metadata } from 'next'
import LegalPage from '../../components/legal/LegalPage'
export const metadata:Metadata={title:'Privacy Policy'}
export default function Page(){return <LegalPage title="Privacy Policy"><p>OfferTamizha may process basic analytics such as page views and deal clicks to improve the website. We do not ask for payment-card details; purchases happen on the merchant website.</p><p>Third-party services such as Supabase, Cloudinary, Vercel and marketplace affiliate programs may process data according to their own policies.</p></LegalPage>}
