import * as supabaseDB from '../../supabase/db'

export async function get({query}) {
  const token = query.get('token')
  const storedToken = await supabaseDB.config.get('server-token')
  if (storedToken && token === storedToken) {
    return {
      body: {
        success: true
      }
    };
  }
  // no response for bad requests
}