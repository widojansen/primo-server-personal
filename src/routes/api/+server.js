import { authorizeRequest } from './_auth'

export async function GET(event) {
  return await authorizeRequest(event, async () => {
    return new Response(JSON.stringify({ 
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      body: {success: true} 
    }))
  })
}

// export async function OPTIONS() {
//   return new Response(JSON.stringify({
//     status: 201,
// 		headers: {
// 			'Access-Control-Allow-Origin': '*',
// 			'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
// 			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
// 		},
//   }))
// }