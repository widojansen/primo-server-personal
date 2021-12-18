import {getServerToken, validateSitePassword, validateInvitationKey} from '../../supabase/admin'

export async function authorizeRequest(req, callback) {
  const { headers, query } = req
  const password = query.get('password')
  const key = query.get('key')

  if (key) {
    const valid = await validateInvitationKey(key)
    return valid ? callback() : {
      body: null
    }
  } else if (password) {
    const valid = await validateSitePassword(req.params.site, password)
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
