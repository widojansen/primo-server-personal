import supabaseAdmin from '../../../supabase/admin';
import { authorizeRequest } from '../_auth';

export async function GET(event) {
	return await authorizeRequest(event, async () => {
		let finalSites = [];
		const { data: sites } = await supabaseAdmin.from('sites').select('*');
		await Promise.all(
			sites.map(async site => {

				const [ data, preview ] = await Promise.all([
					downloadFile(`${site.id}/site.json`),
					downloadFile(`${site.id}/preview.html`)
				])

				finalSites = [
					...finalSites,
					{
						...site,
						data: JSON.parse(data),
						preview
					},
				];
			})
		);
		return new Response(JSON.stringify(finalSites));
	});

	async function downloadFile(location) {
		const {data} = await supabaseAdmin.storage.from('sites').download(`${location}?${Date.now()}`) // bust the cache (i.e. prevent outdated data)
		return await data.text()
	}
}

// export async function OPTIONS() {
// 	return new Response(new Blob(), {
//     status: 201,
// 		statusText: 'no DATA!',
// 		headers: {
// 			'Access-Control-Allow-Origin': '*',
// 			'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
// 			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
// 		},
// 	});
// }
