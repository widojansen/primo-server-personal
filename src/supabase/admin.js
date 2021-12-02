import {createClient} from '@supabase/supabase-js'

const supabaseAdmin = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ADMIN_KEY);

export async function getServerToken() {
  const {data,error} = await supabaseAdmin
    .from('config')
    .select('*')
    .eq('id', 'server-token')
  return data[0]['value']
}

export async function validateSitePassword(password) {
  const {data,error} = await supabaseAdmin
    .from('sites')
    .select('*')
    .eq('password', password)
  return !!data[0]
}
