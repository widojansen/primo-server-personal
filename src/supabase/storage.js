import supabase from './core'

const bucketID = 'sites'

export async function downloadPagePreview(id) {
  const { data } = await supabase
  .storage
  .from(bucketID)
  .download(`${id}/preview.html`)
  return data ? await data.text() : "";
}

export async function uploadPagePreview({ path, preview }) {
  let res = await supabase
    .storage
    .from(bucketID)
    .upload(path, preview, {
      upsert: true
    })

  return res
}

export async function updatePagePreview({ path, preview }) {
  let res = await supabase
    .storage
    .from(bucketID)
    .update(path, preview, {
      upsert: true
    })

  return res
}

export async function uploadSiteData({ id, data }) {
  const json = JSON.stringify(data)
  const res = await supabase
    .storage
    .from(bucketID)
    .upload(`${id}/site.json`, json, {
      upsert: true
    })
  return res
}

export async function uploadSiteFile({ id, file }) {
  const hash = await generateHash(file.data)
  const path = `${id}/site-files/${hash}`
  const exists = await check_if_file_exists(path)
  if (!exists) {
    await supabase
      .storage
      .from(bucketID)
      .upload(path, file.data)
  }
  return { file: file.file, hash }
}

export async function updateSiteData({ id, data }) {
  const json = JSON.stringify(data)
  const res = await supabase
    .storage
    .from(bucketID)
    .update(`${id}/site.json`, json, {
      upsert: true
    })
  return res
}

export async function uploadSiteImage({ id, file }) {
  const {data,error} = await supabase
    .storage
    .from(bucketID)
    .upload(`${id}/assets/${file.name}`, file)

  const { publicURL } = await supabase
    .storage
    .from(bucketID)
    .getPublicUrl(`${id}/assets/${file.name}`)

  if (error) {
    console.warn(error)
  }

  return publicURL 
}

export async function downloadSiteImage(key) {
  const {data,error} = await supabase
    .storage
    .from(bucketID)
    .download(key)
  return data || false
}

export async function downloadSiteData(id) {
  const {data} = await supabase
    .storage
    .from(bucketID)
    .download(`${id}/site.json?${Date.now()}`) // bust the cache (i.e. prevent outdated data)
  const json = await data.text()
  return JSON.parse(json)
}

export async function deleteSiteData(id) {
  const { data, error } = await supabase
  .storage
  .from(bucketID)
  .remove([id])
  return data ? true : false
}

// workaround for checking if file exists in Supabase storage
// TODO: do this with a pg function that queries storage.objects
async function check_if_file_exists(path) {
  const {error} = await supabase
    .storage
    .from(bucketID)
    .upload(path, '')

  if (error?.statusCode === '23505') { // 'duplicate key' error
    return true
  } else {
    const res = await supabase // delete empty uploaded file
      .storage
      .from(bucketID)
      .remove(path)
    return false
  }
}

async function generateHash(string) {
	const msgUint8 = new TextEncoder().encode(string);                           // encode as (utf-8) Uint8Array
	const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8);           // hash the message
	const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
	const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
	return hashHex;
}