import {getServerToken, validateSitePassword} from '../../supabase/admin'

export async function get({headers, query}) {
  
  const password = query.get('password')
  if (password) {
    const valid = await validateSitePassword(password)
    return {
      body: valid ? 'true' : 'false'
    }
  }

  if (!headers.authorization) return { body: 'Must authorize request' }
  
  const token = headers.authorization.replace('Basic ', '')
  const storedToken = await getServerToken()

  if (!storedToken) {
    return {
      body: "Could not read server token"
    };
  } else if (token !== storedToken){
    return {
      body: "Passed token does not match server token"
    };
  } else if (token === storedToken) {
    return {
      body: {
        success: true
      }
    };
  }
}