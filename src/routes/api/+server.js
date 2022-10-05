import { authorizeRequest } from './_auth'

export async function GET(event) {
  return await authorizeRequest(event, async () => {
    return new Response(JSON.stringify({ 
      body: {success: true} 
    }))
  })
}