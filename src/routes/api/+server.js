import { authorizeRequest } from './_auth'

export async function GET(event) {
  return await authorizeRequest(event, async () => {
    return new Response(JSON.stringify({ body: {success: true} }))
  })
}

export async function OPTIONS() {
  return new Response(JSON.stringify({
    status: 201,
    body: {
      success: true
    }
  }))
}