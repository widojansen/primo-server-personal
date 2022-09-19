import supabaseAdmin from '../../supabase/admin'
import {getServerToken, validateSitePassword, validateInvitationKey} from '../../supabase/admin'

export async function authorizeRequest(event, callback) {
  const key = event.url?.searchParams.get('key') // authenticating from Desktop
  const password = event.url?.searchParams.get('password') // authenticating as site-user

  if (key) {
    const valid = await validateInvitationKey(key)
    return valid ? callback() : new Response(JSON.stringify({
      body: null
    }))
  } else if (password) {
    const valid = await validateSitePassword(event.params.site, password)
    return valid ? callback() : new Response(JSON.stringify({
      body: null
    }))
  } 

  const authorization = event.request.headers.get('authorization')

  if (!authorization) return { body: 'Must authorize request' }
  
  const token = authorization.replace(/Basic |Bearer /gi, '')

  if (authorization.includes('Basic')) { // Desktop auth
    const storedToken = await getServerToken()
    if (token === storedToken) return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
      ...(await callback())
    }
    else return new Response(JSON.stringify({
      body: null
    }))
  } else if (authorization.includes('Bearer')) { // Server auth (logged-in)
    const { data: {user} } = await supabaseAdmin.auth.getUser(token)
    if (user) return callback() 
    else return new Response(JSON.stringify({
      body: null
    }))
  }

}
