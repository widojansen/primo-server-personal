import {signUp} from './auth'
import {users} from './db'

export async function createUser({ email, password }) {
  const { user, error } = await signUp({ email, password })
  if (error) {
    return { error: error.message }
  }
  const success = await users.create({
    email: user.email
  })
  return {
    success,
    error: null
  }
}

// export async function addSiteToUser(uid, siteID) {
//   const {websites} = await users.get(uid, 'sites')
//   await users.update(uid, {
//     websites: websites ? [ ...websites, siteID ] : [siteID]
//   })
// }