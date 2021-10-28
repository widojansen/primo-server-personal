import {getServerToken} from '../../supabase/admin'

export async function authorizeRequest(headers, callback) {
  if (!headers.authorization) return { body: 'Must authorize request' }
  
  const token = headers.authorization.replace('Basic ', '')
  const storedToken = await getServerToken()

  if (token === storedToken) return callback()
  else return {
    body: null
  }
}
