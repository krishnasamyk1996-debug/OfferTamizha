import type { MetadataRoute } from 'next'
export default function manifest(): MetadataRoute.Manifest { return { name:'OfferTamizha', short_name:'OfferTamizha', description:'Deals in Tamil • Save More • Live Better', start_url:'/', display:'standalone', background_color:'#ffffff', theme_color:'#ff5a00', icons:[{src:'/assets/favicon.webp',sizes:'any',type:'image/webp'}] } }
