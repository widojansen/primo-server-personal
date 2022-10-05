import Blob from 'cross-blob';

export const handle = async ({event, resolve}) => {
  if (event.request.method !== "OPTIONS") return await resolve(event)
  return new Response(new Blob(), {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  })
}