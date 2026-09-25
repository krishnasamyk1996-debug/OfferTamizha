import 'server-only'
import { createClient } from './supabase/server'

export async function getPublicSiteSettings() {
  try {
    const supabase = await createClient()
    const { data } = await supabase.from('site_settings').select('key,value').eq('is_public', true)
    return Object.fromEntries((data ?? []).map((x: any) => [x.key, String(x.value ?? '')])) as Record<string,string>
  } catch { return {} as Record<string,string> }
}
