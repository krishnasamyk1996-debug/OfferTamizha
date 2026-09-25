import type { Product, Slide } from '../types'
import { createBrowserClient } from '@supabase/ssr'

export type AdminSession = {
  accessToken: string
  refreshToken?: string
  email: string
  expiresAt?: number
}

export type ActivityItem = {
  id: string | number
  action: string
  entity?: string
  detail?: string
  createdAt: string
  tone?: 'green' | 'purple' | 'blue' | 'orange' | 'pink'
}

export type DashboardStats = {
  totalDeals: number
  totalClicks: number
  totalViews: number
  totalUsers: number
}

export type PlatformBreakdown = { name: string; count: number; percent: number }

export type SiteSettingsMap = Record<string, string>

const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\/$/, '')
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ''
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ''
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ''
const SESSION_KEY = 'ot-admin-session'
const LOCAL_DEALS_KEY = 'ot-products'
const LOCAL_ACTIVITY_KEY = 'ot-admin-activities'
const LOCAL_SETTINGS_KEY = 'ot-site-settings'
const LOCAL_BANNERS_KEY = 'ot-admin-banners'
const LOCAL_CLICKS_KEY = 'ot-click-events'
const LOCAL_VIEWS_KEY = 'ot-page-views'
const LOCAL_VISITOR_KEY = 'ot-visitor-id'

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)
export const isCloudinaryConfigured = Boolean(CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET)

let browserSupabase: ReturnType<typeof createBrowserClient> | null = null
function getBrowserSupabase() {
  if (!isSupabaseConfigured) return null
  if (!browserSupabase) browserSupabase = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  return browserSupabase
}

function safeParse<T>(value: string | null, fallback: T): T {
  try { return value ? JSON.parse(value) as T : fallback } catch { return fallback }
}

function getSession(): AdminSession | null {
  if (typeof window === 'undefined') return null
  return safeParse<AdminSession | null>(sessionStorage.getItem(SESSION_KEY), null)
}

export function getAdminSession(): AdminSession | null { return getSession() }

async function apiHeaders(auth = false, extra?: Record<string, string>) {
  let bearer = SUPABASE_ANON_KEY
  if (auth) {
    const client = getBrowserSupabase()
    const fresh = client ? await client.auth.getSession().catch(()=>({ data: { session: null } } as any)) : null
    bearer = fresh?.data?.session?.access_token || getSession()?.accessToken || ''
  }
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${bearer}`,
    ...extra,
  }
}

async function rest<T>(path: string, init: RequestInit = {}, auth = false): Promise<T> {
  if (!isSupabaseConfigured) throw new Error('Supabase is not configured')
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      ...(await apiHeaders(auth)),
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...(init.headers || {}),
    },
  })
  if (!res.ok) {
    const msg = await res.text().catch(()=>'')
    throw new Error(msg || `Backend request failed (${res.status})`)
  }
  if (res.status === 204) return undefined as T
  const txt = await res.text()
  return (txt ? JSON.parse(txt) : undefined) as T
}

export async function adminSignIn(email: string, password: string): Promise<AdminSession> {
  if (!isSupabaseConfigured) {
    if (process.env.NODE_ENV === 'production') throw new Error('Supabase must be configured for production admin login.')
    const demoPassword = process.env.NEXT_PUBLIC_ADMIN_DEMO_PASSWORD || 'offertamizha'
    if (password !== demoPassword) throw new Error('Invalid demo password')
    const session = { accessToken: 'local-demo', email: email || 'admin@offertamizha.local' }
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
    return session
  }
  const client = getBrowserSupabase()!
  const { data, error } = await client.auth.signInWithPassword({ email, password })
  if (error || !data.session) throw new Error(error?.message || 'Login failed')
  const { data: allowed, error: accessError } = await client.rpc('is_offer_admin')
  if (accessError || allowed !== true) {
    await client.auth.signOut()
    throw new Error('This account is signed in, but it is not listed in OfferTamizha admin_users.')
  }
  const session: AdminSession = {
    accessToken: data.session.access_token,
    refreshToken: data.session.refresh_token,
    email: data.user?.email || email,
    expiresAt: data.session.expires_at,
  }
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return session
}

export function adminSignOut() {
  sessionStorage.removeItem(SESSION_KEY)
  void getBrowserSupabase()?.auth.signOut()
}

function rowToProduct(row: any): Product {
  return {
    id: Number(row.id),
    title: row.title,
    store: row.store,
    category: row.category,
    emoji: row.emoji || '🛍️',
    image: row.image || '',
    oldPrice: Number(row.old_price ?? row.oldPrice ?? 0),
    price: Number(row.price ?? 0),
    rating: Number(row.rating ?? 4.4),
    reviews: row.reviews || '0',
    discount: Number(row.discount ?? 0),
    href: row.href || '#',
    description: row.description || '',
    buttonLabel: row.button_label || row.buttonLabel || 'View Deal',
    active: row.active !== false,
    featured: Boolean(row.featured),
    clicks: Number(row.clicks || 0),
    createdAt: row.created_at || row.createdAt,
    updatedAt: row.updated_at || row.updatedAt,
  }
}

function productToRow(p: Partial<Product>) {
  return {
    title: p.title,
    store: p.store || 'Amazon',
    category: p.category,
    emoji: p.emoji || '🛍️',
    image: p.image || '',
    old_price: Number(p.oldPrice || 0),
    price: Number(p.price || 0),
    rating: Number(p.rating || 4.4),
    reviews: p.reviews || '0',
    discount: Number(p.discount || 0),
    href: p.href || '#',
    description: p.description || '',
    button_label: p.buttonLabel || 'View Deal',
    active: p.active !== false,
    featured: Boolean(p.featured),
  }
}

export async function loadDeals(includeInactive = false): Promise<Product[]> {
  if (!isSupabaseConfigured) {
    const local = safeParse<Product[]>(localStorage.getItem(LOCAL_DEALS_KEY), [])
    return includeInactive ? local : local.filter(p=>p.active !== false)
  }
  const filter = includeInactive ? '' : '&active=eq.true'
  const rows = await rest<any[]>(`deals?select=*&order=created_at.desc${filter}`, {}, includeInactive)
  return rows.map(rowToProduct)
}

export async function saveDeal(product: Partial<Product>, id?: number): Promise<Product> {
  const discount = product.discount || (product.oldPrice && product.price
    ? Math.round(((Number(product.oldPrice) - Number(product.price)) / Number(product.oldPrice)) * 100)
    : 0)
  const normalized = { ...product, discount }
  if (!isSupabaseConfigured) {
    const current = safeParse<Product[]>(localStorage.getItem(LOCAL_DEALS_KEY), [])
    const deal: Product = {
      id: id || Math.max(0, ...current.map(x=>x.id)) + 1,
      title: normalized.title || 'Untitled Deal',
      store: (normalized.store as any) || 'Amazon',
      category: normalized.category || 'Amazon Deals',
      emoji: normalized.emoji || '🛍️',
      image: normalized.image || '',
      oldPrice: Number(normalized.oldPrice || 0),
      price: Number(normalized.price || 0),
      rating: Number(normalized.rating || 4.4),
      reviews: normalized.reviews || '0',
      discount,
      href: normalized.href || '#',
      description: normalized.description || '',
      buttonLabel: normalized.buttonLabel || 'View Deal',
      active: normalized.active !== false,
      featured: Boolean(normalized.featured),
      updatedAt: new Date().toISOString(),
      createdAt: current.find(x=>x.id===id)?.createdAt || new Date().toISOString(),
    }
    const next = current.some(x=>x.id===deal.id) ? current.map(x=>x.id===deal.id ? deal : x) : [deal, ...current]
    localStorage.setItem(LOCAL_DEALS_KEY, JSON.stringify(next))
    await logActivity(id ? 'Deal updated' : 'New deal added', 'deal', deal.title, id ? 'purple' : 'green')
    return deal
  }
  const row = productToRow(normalized)
  if (id) {
    const rows = await rest<any[]>(`deals?id=eq.${id}`, {
      method: 'PATCH',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify({ ...row, updated_at: new Date().toISOString() }),
    }, true)
    const deal = rowToProduct(rows[0])
    await logActivity('Deal updated', 'deal', deal.title, 'purple')
    return deal
  }
  const rows = await rest<any[]>('deals', {
    method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify(row),
  }, true)
  const deal = rowToProduct(rows[0])
  await logActivity('New deal added', 'deal', deal.title, 'green')
  return deal
}

export async function deleteDeal(id: number): Promise<void> {
  if (!isSupabaseConfigured) {
    const current = safeParse<Product[]>(localStorage.getItem(LOCAL_DEALS_KEY), [])
    const item = current.find(x=>x.id===id)
    localStorage.setItem(LOCAL_DEALS_KEY, JSON.stringify(current.filter(x=>x.id!==id)))
    await logActivity('Deal deleted', 'deal', item?.title || `#${id}`, 'pink')
    return
  }
  await rest<void>(`deals?id=eq.${id}`, { method: 'DELETE' }, true)
  await logActivity('Deal deleted', 'deal', `Deal #${id}`, 'pink')
}

export async function uploadProductImage(file: File): Promise<string> {
  // Production path: signed upload generated by a server-only Route Handler.
  try {
    const sig = await fetch('/api/admin/cloudinary-signature', { method: 'POST' })
    if (sig.ok) {
      const signed = await sig.json()
      const fd = new FormData()
      fd.append('file', file)
      fd.append('api_key', signed.apiKey)
      fd.append('timestamp', String(signed.timestamp))
      fd.append('signature', signed.signature)
      fd.append('folder', signed.folder)
      const res = await fetch(`https://api.cloudinary.com/v1_1/${signed.cloudName}/image/upload`, { method: 'POST', body: fd })
      const data = await res.json().catch(()=>({}))
      if (!res.ok || !data.secure_url) throw new Error(data.error?.message || 'Cloudinary upload failed')
      return data.secure_url
    }
  } catch (error) {
    console.warn('Signed Cloudinary upload unavailable; trying configured fallback.', error)
  }

  // Optional unsigned fallback for development / migration compatibility.
  if (isCloudinaryConfigured) {
    const fd = new FormData()
    fd.append('file', file)
    fd.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)
    fd.append('folder', 'offertamizha/products')
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, { method: 'POST', body: fd })
    const data = await res.json().catch(()=>({}))
    if (!res.ok || !data.secure_url) throw new Error(data.error?.message || 'Cloudinary upload failed')
    return data.secure_url
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('Cloudinary is not configured. Add server-side Cloudinary environment variables in Vercel.')
  }
  return await new Promise<string>((resolve, reject)=>{
    const reader = new FileReader()
    reader.onload = ()=>resolve(String(reader.result || ''))
    reader.onerror = ()=>reject(new Error('Could not read image'))
    reader.readAsDataURL(file)
  })
}

export async function loadSiteSettings(): Promise<SiteSettingsMap> {
  if (!isSupabaseConfigured) return safeParse<SiteSettingsMap>(localStorage.getItem(LOCAL_SETTINGS_KEY), {})
  const rows = await rest<any[]>('site_settings?select=key,value&is_public=eq.true', {}, false)
  return Object.fromEntries(rows.map(x=>[x.key, String(x.value ?? '')]))
}

export async function loadAdminSettings(): Promise<SiteSettingsMap> {
  if (!isSupabaseConfigured) return safeParse<SiteSettingsMap>(localStorage.getItem(LOCAL_SETTINGS_KEY), {})
  const rows = await rest<any[]>('site_settings?select=key,value&order=key.asc', {}, true)
  return Object.fromEntries(rows.map(x=>[x.key, String(x.value ?? '')]))
}

export async function saveSiteSettings(settings: SiteSettingsMap): Promise<void> {
  if (!isSupabaseConfigured) {
    localStorage.setItem(LOCAL_SETTINGS_KEY, JSON.stringify(settings))
    await logActivity('Site settings updated', 'settings', 'Brand, social and SEO settings', 'blue')
    return
  }
  const rows = Object.entries(settings).map(([key,value])=>({ key, value, is_public: true, updated_at: new Date().toISOString() }))
  await rest<any[]>('site_settings?on_conflict=key', {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify(rows),
  }, true)
  await logActivity('Site settings updated', 'settings', 'Brand, social and SEO settings', 'blue')
}

export async function loadBanners(): Promise<Slide[]> {
  if (!isSupabaseConfigured) return safeParse<Slide[]>(localStorage.getItem(LOCAL_BANNERS_KEY), [])
  const rows = await rest<any[]>('banners?select=*&active=eq.true&order=sort_order.asc', {}, false)
  return rows.map((r:any)=>({ id:Number(r.id), type:'image', src:r.image, title:r.title, cta:r.cta, href:r.href } as Slide))
}

export async function saveBanner(banner: { id?:number; title?:string; image:string; href?:string; cta?:string; active?:boolean; sortOrder?:number }): Promise<void> {
  if (!isSupabaseConfigured) {
    const current = safeParse<any[]>(localStorage.getItem(LOCAL_BANNERS_KEY), [])
    const row = { ...banner, id: banner.id || Math.max(0,...current.map(x=>x.id||0))+1 }
    const next = current.some(x=>x.id===row.id) ? current.map(x=>x.id===row.id?row:x) : [...current,row]
    localStorage.setItem(LOCAL_BANNERS_KEY, JSON.stringify(next))
    await logActivity('Banner updated', 'banner', banner.title || 'Homepage banner', 'pink')
    return
  }
  const row = { title:banner.title||'', image:banner.image, href:banner.href||'#', cta:banner.cta||'View Deal', active:banner.active!==false, sort_order:banner.sortOrder||0 }
  if (banner.id) await rest(`banners?id=eq.${banner.id}`, { method:'PATCH', body:JSON.stringify(row) }, true)
  else await rest('banners', { method:'POST', body:JSON.stringify(row) }, true)
  await logActivity('Banner updated', 'banner', banner.title || 'Homepage banner', 'pink')
}

function makeVisitorId() {
  let id = localStorage.getItem(LOCAL_VISITOR_KEY)
  if (!id) {
    id = (crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`)
    localStorage.setItem(LOCAL_VISITOR_KEY, id)
  }
  return id
}

export async function recordPageView(path = location.pathname) {
  try {
    const visitorId = makeVisitorId()
    if (!isSupabaseConfigured) {
      const views = safeParse<any[]>(localStorage.getItem(LOCAL_VIEWS_KEY), [])
      views.push({ visitorId, path, at:new Date().toISOString() })
      localStorage.setItem(LOCAL_VIEWS_KEY, JSON.stringify(views.slice(-5000)))
      return
    }
    await rest('visitors?on_conflict=visitor_id', {
      method:'POST', headers:{ Prefer:'resolution=ignore-duplicates,return=minimal' }, body:JSON.stringify({ visitor_id:visitorId })
    })
    await rest('page_views', { method:'POST', body:JSON.stringify({ visitor_id:visitorId, path }) })
  } catch {}
}

export async function recordDealClick(dealId: number) {
  try {
    const visitorId = makeVisitorId()
    if (!isSupabaseConfigured) {
      const clicks = safeParse<any[]>(localStorage.getItem(LOCAL_CLICKS_KEY), [])
      clicks.push({ dealId, visitorId, at:new Date().toISOString() })
      localStorage.setItem(LOCAL_CLICKS_KEY, JSON.stringify(clicks.slice(-5000)))
      return
    }
    await rest('click_events', { method:'POST', body:JSON.stringify({ deal_id:dealId, visitor_id:visitorId }) })
  } catch {}
}

async function countTable(table: string): Promise<number> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=id`, {
    method:'HEAD', headers:{ ...(await apiHeaders(true)), Prefer:'count=exact' }
  })
  if (!res.ok) return 0
  const range = res.headers.get('content-range') || ''
  const total = Number(range.split('/')[1])
  return Number.isFinite(total) ? total : 0
}

export async function loadDashboardStats(): Promise<DashboardStats> {
  if (!isSupabaseConfigured) {
    const deals = safeParse<Product[]>(localStorage.getItem(LOCAL_DEALS_KEY), [])
    const clicks = safeParse<any[]>(localStorage.getItem(LOCAL_CLICKS_KEY), [])
    const views = safeParse<any[]>(localStorage.getItem(LOCAL_VIEWS_KEY), [])
    const users = new Set(views.map(x=>x.visitorId)).size
    return { totalDeals:deals.length, totalClicks:clicks.length, totalViews:views.length, totalUsers:users }
  }
  const [totalDeals,totalClicks,totalViews,totalUsers] = await Promise.all([
    countTable('deals'), countTable('click_events'), countTable('page_views'), countTable('visitors')
  ])
  return { totalDeals,totalClicks,totalViews,totalUsers }
}

export async function loadPlatformBreakdown(): Promise<PlatformBreakdown[]> {
  const deals = await loadDeals(true)
  const counts = new Map<string,number>()
  deals.forEach(d=>counts.set(d.store, (counts.get(d.store)||0)+1))
  const total = Math.max(1,deals.length)
  return [...counts.entries()].sort((a,b)=>b[1]-a[1]).map(([name,count])=>({name,count,percent:Math.round(count*100/total)}))
}

export async function logActivity(action:string, entity?:string, detail?:string, tone:ActivityItem['tone']='green') {
  const item: ActivityItem = { id:crypto.randomUUID?.() || Date.now(), action, entity, detail, createdAt:new Date().toISOString(), tone }
  if (!isSupabaseConfigured) {
    const current = safeParse<ActivityItem[]>(localStorage.getItem(LOCAL_ACTIVITY_KEY), [])
    localStorage.setItem(LOCAL_ACTIVITY_KEY, JSON.stringify([item,...current].slice(0,50)))
    return
  }
  try { await rest('activity_logs', { method:'POST', body:JSON.stringify({ action, entity, detail, tone }) }, true) } catch {}
}

export async function loadActivities(): Promise<ActivityItem[]> {
  if (!isSupabaseConfigured) return safeParse<ActivityItem[]>(localStorage.getItem(LOCAL_ACTIVITY_KEY), [])
  const rows = await rest<any[]>('activity_logs?select=*&order=created_at.desc&limit=20', {}, true)
  return rows.map(r=>({ id:r.id, action:r.action, entity:r.entity, detail:r.detail, createdAt:r.created_at, tone:r.tone }))
}

export type DailyAnalytics = { label:string; date:string; views:number; clicks:number }

export async function loadDailyAnalytics(days = 8): Promise<DailyAnalytics[]> {
  const list: DailyAnalytics[] = []
  const today = new Date()
  for (let i=days-1;i>=0;i--) {
    const d = new Date(today)
    d.setDate(today.getDate()-i)
    const date = d.toISOString().slice(0,10)
    list.push({ date, label:d.toLocaleDateString('en-US',{month:'short',day:'numeric'}), views:0, clicks:0 })
  }
  const index = new Map(list.map((x,i)=>[x.date,i]))
  if (!isSupabaseConfigured) {
    const views = safeParse<any[]>(localStorage.getItem(LOCAL_VIEWS_KEY), [])
    const clicks = safeParse<any[]>(localStorage.getItem(LOCAL_CLICKS_KEY), [])
    views.forEach(v=>{ const k=String(v.at||'').slice(0,10); const i=index.get(k); if(i!==undefined) list[i].views++ })
    clicks.forEach(v=>{ const k=String(v.at||'').slice(0,10); const i=index.get(k); if(i!==undefined) list[i].clicks++ })
    return list
  }
  const start = list[0].date + 'T00:00:00.000Z'
  try {
    const [views,clicks] = await Promise.all([
      rest<any[]>(`page_views?select=created_at&created_at=gte.${encodeURIComponent(start)}`, {}, true),
      rest<any[]>(`click_events?select=created_at&created_at=gte.${encodeURIComponent(start)}`, {}, true),
    ])
    views.forEach(v=>{ const k=String(v.created_at||'').slice(0,10); const i=index.get(k); if(i!==undefined) list[i].views++ })
    clicks.forEach(v=>{ const k=String(v.created_at||'').slice(0,10); const i=index.get(k); if(i!==undefined) list[i].clicks++ })
  } catch {}
  return list
}
