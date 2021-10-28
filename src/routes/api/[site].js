import * as actions from '../../actions'
import * as supabaseDB from '../../supabase/db'
import { authorizeRequest } from './_utils'

export async function post({ body, headers }) {

  return await authorizeRequest(headers, async () => {
    await actions.sites.save(body.site)
    return {
      body: 'ok'
    }
  })

}