import * as actions from '../../actions'
import * as supabaseDB from '../../supabase/db'
import { authorizeRequest } from './_utils'

export async function post(req) {
  // TODO: Modify RLS so site's w/ password are updateable anonymously (i.e. w/ password)
  // or run as admin on server side when password matches
  return await authorizeRequest(req, async () => {
    await actions.sites.save(req.body.site)
    return {
      body: 'ok'
    }
  })
}