'use client'

// Responsive hero uses dedicated desktop and mobile assets.

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight, BadgePercent, Bell, Heart, Home, Instagram,
  Menu, Moon, Search, Send, ShieldCheck, ShoppingBag, Sparkles, Star, Sun, Tag,
  Truck, Users, X, Youtube, Zap, Clock3, ExternalLink, Grid2X2,
} from 'lucide-react'
import { categories, products as seedProducts } from '../../lib/data'
import type { Banner, Product } from '../../lib/types'
import { siteSettings } from '../../lib/siteConfig'
import { loadBanners, loadDeals, loadSiteSettings, recordDealClick, recordPageView, type SiteSettingsMap } from '../../lib/backend/client'
import { cn } from '../../lib/utils'

const categoryTones: Record<string,string> = {
  'Meesho Deals':'from-fuchsia-500/15 to-pink-500/5 text-fuchsia-700 dark:text-fuchsia-300',
  'Amazon Deals':'from-amber-500/15 to-orange-500/5 text-amber-700 dark:text-amber-300',
  'Flipkart Deals':'from-blue-500/15 to-cyan-500/5 text-blue-700 dark:text-blue-300',
  'Myntra Deals':'from-rose-500/15 to-pink-500/5 text-rose-700 dark:text-rose-300',
  Fashion:'from-red-500/15 to-orange-500/5 text-red-700 dark:text-red-300',
  Electronics:'from-violet-500/15 to-indigo-500/5 text-violet-700 dark:text-violet-300',
  'Home & Kitchen':'from-emerald-500/15 to-teal-500/5 text-emerald-700 dark:text-emerald-300',
  Beauty:'from-pink-500/15 to-purple-500/5 text-pink-700 dark:text-pink-300',
}

function useTheme(){
  const [dark,setDark]=useState(false)
  useEffect(()=>{ const saved=localStorage.getItem('ot-theme'); const enabled=saved==='dark' || (!saved && matchMedia('(prefers-color-scheme: dark)').matches); setDark(enabled); document.documentElement.classList.toggle('dark',enabled) },[])
  const toggle=()=>setDark(v=>{const n=!v; document.documentElement.classList.toggle('dark',n); localStorage.setItem('ot-theme',n?'dark':'light'); return n})
  return {dark,toggle}
}

function Header({query,setQuery,onCategory,telegramUrl,dark,toggleTheme}:{query:string;setQuery:(v:string)=>void;onCategory:(v:string|null)=>void;telegramUrl:string;dark:boolean;toggleTheme:()=>void}){
  const [open,setOpen]=useState(false)
  const links=['Meesho Deals','Amazon Deals','Flipkart Deals','Myntra Deals','Fashion','Electronics','Home & Kitchen','Beauty']
  return <>
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/88">
      <div className="mx-auto flex h-16 max-w-[1500px] items-center gap-3 px-3 sm:px-5 lg:px-6">
        <button onClick={()=>setOpen(true)} className="grid size-10 place-items-center rounded-xl border border-slate-200 bg-white lg:hidden dark:border-slate-800 dark:bg-slate-900" aria-label="Open menu"><Menu className="size-5"/></button>
        <button onClick={()=>onCategory(null)} className="shrink-0" aria-label="OfferTamizha home"><img src="/assets/logo.webp" alt="OfferTamizha" className="h-10 w-auto sm:h-11"/></button>
        <div className="hidden min-w-0 flex-1 items-center lg:flex">
          <div className="mx-auto flex h-11 w-full max-w-2xl items-center rounded-2xl border border-slate-200 bg-slate-50 pl-4 shadow-sm transition focus-within:border-brand-400 focus-within:ring-4 focus-within:ring-brand-500/10 dark:border-slate-800 dark:bg-slate-900">
            <Search className="size-4 text-slate-400"/>
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search products, deals or brands..." className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-slate-400"/>
            <button className="m-1 grid size-9 place-items-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950" aria-label="Search"><Search className="size-4"/></button>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button onClick={toggleTheme} className="grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800" aria-label="Toggle theme">{dark?<Sun className="size-4"/>:<Moon className="size-4"/>}</button>
          <a href={telegramUrl} target="_blank" rel="noreferrer" className="hidden h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 text-sm font-bold text-white shadow-lg shadow-blue-500/20 sm:flex"><Send className="size-4"/>Join Telegram</a>
          <button className="grid size-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 sm:hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"><Bell className="size-4"/></button>
        </div>
      </div>
      <div className="mx-auto px-3 pb-3 lg:hidden"><div className="mx-auto flex h-11 max-w-[1500px] items-center rounded-2xl border border-slate-200 bg-slate-50 px-3 dark:border-slate-800 dark:bg-slate-900"><Search className="size-4 text-slate-400"/><input value={query} onChange={e=>setQuery(e.target.value)} className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm outline-none" placeholder="Search deals..."/></div></div>
      <nav className="hidden border-t border-slate-100 lg:block dark:border-slate-900"><div className="mx-auto flex max-w-[1500px] items-center gap-6 overflow-x-auto px-6 py-3 text-[13px] font-semibold text-slate-600 dark:text-slate-300"><button onClick={()=>onCategory(null)} className="flex items-center gap-1.5 whitespace-nowrap text-brand-600"><Grid2X2 className="size-4"/>All Deals</button>{links.map(x=><button key={x} onClick={()=>onCategory(x)} className="whitespace-nowrap transition hover:text-brand-600">{x}</button>)}</div></nav>
    </header>
    {open&&<div className="fixed inset-0 z-[70] lg:hidden"><button aria-label="Close menu" className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm" onClick={()=>setOpen(false)}/><aside className="relative h-full w-[84%] max-w-sm animate-[fade-up_.2s_ease-out] overflow-y-auto bg-white p-5 shadow-2xl dark:bg-slate-950"><div className="flex items-center justify-between"><img src="/assets/logo.webp" className="h-10" alt="OfferTamizha"/><button onClick={()=>setOpen(false)} className="grid size-10 place-items-center rounded-xl bg-slate-100 dark:bg-slate-900"><X className="size-5"/></button></div><div className="mt-6 grid gap-2"><button onClick={()=>{onCategory(null);setOpen(false)}} className="flex items-center justify-between rounded-xl bg-brand-50 px-4 py-3 text-left font-bold text-brand-700 dark:bg-brand-950/50 dark:text-brand-300">All Deals<ArrowRight className="size-4"/></button>{links.map(x=><button key={x} onClick={()=>{onCategory(x);setOpen(false)}} className="flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-900">{x}<ArrowRight className="size-4"/></button>)}</div><a href={telegramUrl} target="_blank" rel="noreferrer" className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-3 font-bold text-white"><Send className="size-4"/>Join Telegram</a></aside></div>}
  </>
}

function HeroBanner({banner}:{banner:Banner|null}){
  if(!banner?.src)return null
  const image=<img
    src={banner.src}
    alt={banner.title||'OfferTamizha banner'}
    className="block h-auto w-full object-contain"
    loading="eager"
    fetchPriority="high"
    decoding="async"
  />
  return <section className="mx-auto mt-3 max-w-[1500px] px-2 sm:mt-4 sm:px-5 lg:px-6">
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-3xl dark:border-slate-800 dark:bg-slate-900">
      {banner.href&&banner.href!=='#'?<a href={banner.href} target="_blank" rel="noreferrer">{image}</a>:image}
    </div>
  </section>
}
function CategoryGrid({onPick}:{onPick:(v:string)=>void}){
  return <section className="mx-auto max-w-[1500px] px-3 py-7 sm:px-5 lg:px-6"><div className="mb-4 flex items-end justify-between"><div><div className="flex items-center gap-2 text-xs font-black uppercase tracking-[.18em] text-brand-600"><Sparkles className="size-4"/>Browse faster</div><h2 className="mt-1 text-xl font-black tracking-tight sm:text-2xl">Shop by category</h2></div><span className="hidden text-xs text-slate-500 sm:block">Fresh offers, hand-picked for Tamil shoppers</span></div><div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-8">{categories.map(c=><button key={c.name} onClick={()=>onPick(c.name)} className={cn('group rounded-2xl border border-slate-200 bg-gradient-to-br p-3 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800',categoryTones[c.name]||'from-slate-500/10 to-slate-500/5')}><div className="grid size-11 place-items-center rounded-xl bg-white/90 text-2xl shadow-sm transition group-hover:scale-105 dark:bg-slate-950/70">{c.icon}</div><b className="mt-3 block text-xs leading-tight sm:text-[13px]">{c.name}</b><small className="mt-1 block text-[10px] opacity-70">{c.sub}</small></button>)}</div></section>
}

function DealCard({p,wished,onWish}:{p:Product;wished:boolean;onWish:()=>void}){
  const open=()=>{ void recordDealClick(p.id); if(p.href&&p.href!=='#') window.open(p.href,'_blank','noopener,noreferrer') }
  return <article className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-orange-500/10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-800">
    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800"><div className="absolute left-2 top-2 z-10 rounded-lg bg-slate-950/85 px-2 py-1 text-[10px] font-black text-white shadow backdrop-blur">Affiliate Deal</div><button onClick={onWish} className={cn('absolute right-2 top-2 z-10 grid size-9 place-items-center rounded-full border bg-white/90 shadow-sm backdrop-blur transition dark:bg-slate-950/85',wished?'border-rose-200 text-rose-500':'border-slate-200 text-slate-500 dark:border-slate-700')} aria-label="Wishlist"><Heart className={cn('size-4',wished&&'fill-current')}/></button>{p.image?<img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/>:<div className="grid h-full place-items-center text-6xl">{p.emoji||'🛍️'}</div>}</div>
    <div className="flex flex-1 flex-col p-3.5"><div className="flex items-center justify-between gap-2"><span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{p.store}</span>{p.featured&&<span className="flex items-center gap-1 text-[10px] font-black text-brand-600"><Zap className="size-3 fill-current"/>Featured</span>}</div><h3 className="mt-2 line-clamp-2 min-h-10 text-[13px] font-bold leading-5 sm:text-sm">{p.title}</h3>{p.description&&<p className="mt-1 line-clamp-1 text-[11px] text-slate-500">{p.description}</p>}<div className="mt-2 flex items-center gap-1 text-amber-500"><Star className="size-3.5 fill-current"/><b className="text-xs">{p.rating}</b><span className="text-[10px] text-slate-400">({p.reviews})</span></div><p className="mt-2 text-[10px] leading-4 text-slate-500">Offer details and availability are confirmed on the merchant website.</p><button onClick={open} className="mt-3 flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-orange-500 text-xs font-black text-white shadow-md shadow-orange-500/15 transition hover:brightness-105">{p.buttonLabel||'View Deal'}<ExternalLink className="size-3.5"/></button></div>
  </article>
}

function Footer({settings}:{settings:SiteSettingsMap}){
  const telegram=settings.telegramUrl||siteSettings.telegramUrl, instagram=settings.instagramUrl||siteSettings.instagramUrl, youtube=settings.youtubeUrl||siteSettings.youtubeUrl
  return <footer className="mt-10 bg-slate-950 text-white"><div className="mx-auto max-w-[1500px] px-5 py-12 lg:px-6"><div className="grid gap-9 md:grid-cols-2 lg:grid-cols-5"><div className="lg:col-span-2"><img src="/assets/logo-footer.webp" alt="OfferTamizha" className="h-12 w-auto"/><p className="mt-4 max-w-md text-sm leading-6 text-slate-400">{settings.tagline||siteSettings.tagline}. Smart, verified deal discovery across leading Indian marketplaces.</p><div className="mt-5 flex gap-2"><a href={telegram} target="_blank" rel="noreferrer" className="grid size-10 place-items-center rounded-xl bg-slate-900 hover:bg-sky-500"><Send className="size-4"/></a><a href={instagram} target="_blank" rel="noreferrer" className="grid size-10 place-items-center rounded-xl bg-slate-900 hover:bg-pink-500"><Instagram className="size-4"/></a><a href={youtube} target="_blank" rel="noreferrer" className="grid size-10 place-items-center rounded-xl bg-slate-900 hover:bg-red-500"><Youtube className="size-4"/></a></div></div><div><h4 className="text-sm font-black">Quick Links</h4><div className="mt-4 grid gap-2 text-sm text-slate-300"><Link className="font-semibold hover:text-white" href="/">Home</Link><Link className="font-semibold hover:text-white" href="/contact">Contact</Link><Link className="font-bold text-orange-300 hover:text-orange-200" href="/affiliate-disclosure">Affiliate Disclosure</Link></div></div><div><h4 className="text-sm font-black">Legal</h4><div className="mt-4 grid gap-2 text-sm text-slate-400"><Link className="font-semibold hover:text-white" href="/privacy">Privacy Policy</Link><Link className="font-semibold hover:text-white" href="/terms">Terms & Conditions</Link></div></div><div><h4 className="text-sm font-black">Support</h4><Link href="/contact" className="mt-4 inline-block text-sm font-semibold text-slate-300 hover:text-white">Contact OfferTamizha</Link><p className="mt-2 text-xs leading-5 text-slate-500">Offer details, availability, coupons and seller terms may change on the merchant website. Always verify the final details before continuing.</p></div></div><div className="mt-10 flex flex-col gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"><span>© 2026 OfferTamizha. All rights reserved.</span><span>Deal Smart • Shop Smart • Tamizha Smart ❤️</span></div></div></footer>
}

export default function StorefrontApp(){
  const [deals,setDeals]=useState<Product[]>(seedProducts)
  const [banner,setBanner]=useState<Banner|null>(null)
  const [settings,setSettings]=useState<SiteSettingsMap>({})
  const [query,setQuery]=useState('')
  const [category,setCategory]=useState<string|null>(null)
  const [sort,setSort]=useState<'featured'|'newest'>('featured')
  const [wish,setWish]=useState<number[]>([])
  const [wishlistOpen,setWishlistOpen]=useState(false)
  const [loading,setLoading]=useState(true)
  const {dark,toggle}=useTheme()

  useEffect(()=>{ try{setWish(JSON.parse(localStorage.getItem('ot-wishlist')||'[]'))}catch{}; recordPageView('/').catch(()=>{}); (async()=>{try{const [d,b,s]=await Promise.all([loadDeals(false),loadBanners(),loadSiteSettings()]); if(d.length)setDeals(d); setBanner(b[0]||null); setSettings(s)}catch{}finally{setLoading(false)}})() },[])
  const toggleWish=(id:number)=>setWish(v=>{const next=v.includes(id)?v.filter(x=>x!==id):[...v,id];localStorage.setItem('ot-wishlist',JSON.stringify(next));return next})
  const filtered=useMemo(()=>{let list=deals.filter(d=>d.active!==false); if(category){list=list.filter(d=>d.category===category||`${d.store} Deals`===category)} if(query.trim()){const q=query.toLowerCase();list=list.filter(d=>`${d.title} ${d.store} ${d.category} ${d.description||''}`.toLowerCase().includes(q))} if(sort==='newest')list=[...list].sort((a,b)=>String(b.createdAt||'').localeCompare(String(a.createdAt||''))); if(sort==='featured')list=[...list].sort((a,b)=>Number(b.featured)-Number(a.featured)); return list},[deals,category,query,sort])
  const telegram=settings.telegramUrl||siteSettings.telegramUrl
  const wishlistDeals=useMemo(()=>deals.filter(d=>wish.includes(d.id)&&d.active!==false),[deals,wish])
  return <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
    <Header query={query} setQuery={setQuery} onCategory={setCategory} telegramUrl={telegram} dark={dark} toggleTheme={toggle}/>
    <main>
      <HeroBanner banner={banner}/>
      <CategoryGrid onPick={setCategory}/>
      <section className="mx-auto max-w-[1500px] px-3 sm:px-5 lg:px-6"><div className="overflow-hidden rounded-2xl bg-gradient-to-r from-brand-500 via-orange-500 to-rose-500 p-[1px] shadow-lg shadow-orange-500/10"><div className="flex flex-col gap-3 rounded-[15px] bg-white/96 px-4 py-4 sm:flex-row sm:items-center sm:justify-between dark:bg-slate-950/95"><div className="flex items-center gap-3"><div className="grid size-11 place-items-center rounded-xl bg-brand-500 text-white"><Zap className="size-5 fill-current"/></div><div><p className="text-xs font-black uppercase tracking-[.2em] text-brand-600">Hot right now</p><h2 className="text-lg font-black sm:text-xl">Today&apos;s smartest savings</h2></div></div><div className="flex items-center gap-2 text-xs font-bold text-slate-500"><Clock3 className="size-4"/>Deals can change anytime — grab them while live.</div></div></div></section>
      <section className="mx-auto max-w-[1500px] px-3 py-7 sm:px-5 lg:px-6"><div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-black uppercase tracking-[.18em] text-brand-600">{category||'Latest Deals'}</p><h2 className="mt-1 text-2xl font-black tracking-tight">{query?`Results for “${query}”`:category||'Hand-picked deals for you'}</h2><p className="mt-1 text-xs text-slate-500">{loading?'Syncing live deals…':`${filtered.length} active deals`}</p></div><select value={sort} onChange={e=>setSort(e.target.value as any)} className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold outline-none dark:border-slate-800 dark:bg-slate-900"><option value="featured">Featured first</option><option value="newest">Newest first</option></select></div>{filtered.length?<div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">{filtered.map(p=><DealCard key={p.id} p={p} wished={wish.includes(p.id)} onWish={()=>toggleWish(p.id)}/>)}</div>:<div className="rounded-3xl border border-dashed border-slate-300 bg-white p-14 text-center dark:border-slate-700 dark:bg-slate-900"><Search className="mx-auto size-8 text-slate-400"/><h3 className="mt-3 font-black">No matching deals</h3><p className="mt-1 text-sm text-slate-500">Try another search or category.</p></div>}</section>
      <section className="mx-auto grid max-w-[1500px] gap-3 px-3 sm:px-5 md:grid-cols-2 lg:px-6"><div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 to-slate-800 p-6 text-white"><BadgePercent className="absolute -right-5 -top-5 size-32 text-white/5"/><p className="text-xs font-black uppercase tracking-[.2em] text-orange-300">Daily Picks</p><h3 className="mt-2 text-2xl font-black">Better deals. Less searching.</h3><p className="mt-2 max-w-md text-sm leading-6 text-slate-300">We bring offers from multiple marketplaces into one clean Tamil-first destination.</p><button onClick={()=>{setCategory(null);window.scrollTo({top:500,behavior:'smooth'})}} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-black text-slate-950">Explore deals<ArrowRight className="size-4"/></button></div><div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 to-blue-700 p-6 text-white"><Send className="absolute -right-4 -top-4 size-32 text-white/10"/><p className="text-xs font-black uppercase tracking-[.2em] text-sky-100">Telegram Community</p><h3 className="mt-2 text-2xl font-black">Get deal alerts faster</h3><p className="mt-2 max-w-md text-sm leading-6 text-blue-100">Join OfferTamizha on Telegram for quick drops and limited-time offers.</p><a href={telegram} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-black text-blue-700">Join now<ArrowRight className="size-4"/></a></div></section>
      <section className="mx-auto max-w-[1500px] px-3 py-7 sm:px-5 lg:px-6"><div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white sm:grid-cols-2 lg:grid-cols-4 dark:border-slate-800 dark:bg-slate-900">{[[ShieldCheck,'Curated deals','Useful offers, filtered for shoppers'],[Tag,'Merchant linked','Check final offer details on the original seller site'],[Truck,'Marketplace checkout','Purchase on the original seller site'],[Users,'Tamil community','Built for Tamil deal hunters']].map(([Icon,title,sub]:any)=><div key={title} className="flex items-center gap-3 border-b border-slate-200 p-5 sm:border-r lg:border-b-0 dark:border-slate-800"><div className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950/40"><Icon className="size-5"/></div><div><b className="text-sm">{title}</b><p className="mt-1 text-[11px] text-slate-500">{sub}</p></div></div>)}</div></section>
    </main>
    <Footer settings={settings}/>
    {wishlistOpen&&<div className="fixed inset-0 z-[80]"><button aria-label="Close wishlist" className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm" onClick={()=>setWishlistOpen(false)}/><aside className="absolute inset-x-0 bottom-0 max-h-[78vh] overflow-y-auto rounded-t-3xl bg-white p-4 shadow-2xl dark:bg-slate-950"><div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-slate-300 dark:bg-slate-700"/><div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-[.18em] text-brand-600">Saved deals</p><h3 className="text-xl font-black">Wishlist</h3></div><button onClick={()=>setWishlistOpen(false)} className="grid size-10 place-items-center rounded-xl bg-slate-100 dark:bg-slate-900" aria-label="Close wishlist"><X className="size-5"/></button></div>{wishlistDeals.length?<div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">{wishlistDeals.map(p=><DealCard key={p.id} p={p} wished={true} onWish={()=>toggleWish(p.id)}/>)}</div>:<div className="py-14 text-center"><Heart className="mx-auto size-9 text-slate-300"/><h4 className="mt-3 font-black">Your wishlist is empty</h4><p className="mt-1 text-sm text-slate-500">Tap the heart icon on any deal to save it here.</p></div>}</aside></div>}
    <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-4 border-t border-slate-200 bg-white/95 px-2 py-2 backdrop-blur md:hidden dark:border-slate-800 dark:bg-slate-950/95"><button onClick={()=>setCategory(null)} className="grid place-items-center gap-1 text-[10px] font-bold text-brand-600"><Home className="size-5"/>Home</button><button onClick={()=>window.scrollTo({top:560,behavior:'smooth'})} className="grid place-items-center gap-1 text-[10px] font-bold text-slate-500"><Grid2X2 className="size-5"/>Categories</button><button onClick={()=>setWishlistOpen(true)} className="relative grid place-items-center gap-1 text-[10px] font-bold text-slate-500"><span className="relative"><Heart className="size-5"/>{wish.length>0&&<span className="absolute -right-2 -top-2 grid min-w-4 place-items-center rounded-full bg-rose-500 px-1 text-[9px] font-black leading-4 text-white">{wish.length}</span>}</span>Wishlist</button><a href={telegram} target="_blank" rel="noreferrer" className="grid place-items-center gap-1 text-[10px] font-bold text-slate-500"><Send className="size-5"/>Telegram</a></nav>
    <div className="h-16 md:hidden"/>
  </div>
}
