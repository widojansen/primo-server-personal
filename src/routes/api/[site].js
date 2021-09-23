import * as actions from '../../actions'
import * as supabaseDB from '../../supabase/db'
import * as supabaseStorage from '../../supabase/storage'

export async function post(request) {
  const { site:siteID, token } = request.params
  const storedToken = await supabaseDB.config.get('server-token')
  if (storedToken && token === storedToken) {
    const { site } = request.body
    await actions.sites.save(site)
    return {
      body: 'ok'
    }
  }
  // no response for bad requests
}