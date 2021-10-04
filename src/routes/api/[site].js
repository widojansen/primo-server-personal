import * as actions from '../../actions'
import * as supabaseDB from '../../supabase/db'

export async function post({ body }) {
  const { site, token } = body
  const storedToken = await supabaseDB.config.get('server-token')
  if (storedToken && token === storedToken) {
    await actions.sites.save(site)
    return {
      body: 'ok'
    }
  }
  // no response for bad requests
}