import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { createClient } from '../../../../lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST() {
  const cloudName=process.env.CLOUDINARY_CLOUD_NAME
  const apiKey=process.env.CLOUDINARY_API_KEY
  const apiSecret=process.env.CLOUDINARY_API_SECRET
  if(!cloudName||!apiKey||!apiSecret) return NextResponse.json({error:'Cloudinary is not configured'},{status:503})

  const supabase=await createClient()
  const { data: claims }=await supabase.auth.getClaims()
  if(!claims?.claims) return NextResponse.json({error:'Unauthorized'},{status:401})
  const { data: allowed }=await supabase.rpc('is_offer_admin')
  if(allowed!==true) return NextResponse.json({error:'Forbidden'},{status:403})

  cloudinary.config({cloud_name:cloudName,api_key:apiKey,api_secret:apiSecret,secure:true})
  const timestamp=Math.floor(Date.now()/1000)
  const folder='offertamizha/products'
  const signature=cloudinary.utils.api_sign_request({timestamp,folder},apiSecret)
  return NextResponse.json({cloudName,apiKey,timestamp,folder,signature},{headers:{'Cache-Control':'no-store'}})
}
