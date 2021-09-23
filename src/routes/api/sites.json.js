import * as supabaseDB from '../../supabase/db'
import * as supabaseStorage from '../../supabase/storage'

export async function get({ query }) {
  const token = query.get('token')
  const storedToken = await supabaseDB.config.get('server-token')
  if (storedToken && token === storedToken) {
    let finalSites = []
    const sites = await supabaseDB.sites.get({query: `id, name, owner, password`})
    await Promise.all(
      sites.map(async site => {
        const data = await supabaseStorage.downloadSiteData(site.id)
        finalSites = [
          ...finalSites,
          {
            ...site,
            data
          }
        ]
      })
    )
    return {
      body: {
        sites: finalSites
      }
    };
  }
  // no response for bad requests
}