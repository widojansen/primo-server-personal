import { authorizeRequest } from './_auth'
import {signUp} from '../../supabase/auth'
import {users, config} from '../../supabase/db'

export async function post(req) {
  return await authorizeRequest(req, async () => {
    await signUp(req.body)
    const success = await users.create(req.body)
    await config.update('invitation-key', '')
    return {
      body: {
        success,
        error: !success ? 'Could not create user' : null
      }
    }
  })
}