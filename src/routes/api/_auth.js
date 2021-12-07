import {getServerToken, validateSitePassword} from '../../supabase/admin'

export async function authorizeRequest(req, callback) {
  const { headers, query } = req
  const password = query.get('password')

  if (password) {
    const valid = await validateSitePassword(password)
    return valid ? callback() : {
      body: null
    }
  }

  if (!headers.authorization) return { body: 'Must authorize request' }
  
  const token = headers.authorization.replace('Basic ', '')
  const storedToken = await getServerToken()

  if (token === storedToken) return callback()
  else return {
    body: null
  }
}
