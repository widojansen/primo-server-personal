import {saveSite} from '../../supabase/admin'
import { authorizeRequest } from './_auth'

export async function post(req) {
  return await authorizeRequest(req, async () => {
    const res = await saveSite(req.body)
    return {
      body:  res ? 'true' : 'false'
    }
  })
}