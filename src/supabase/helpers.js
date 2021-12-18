import axios from 'axios'

export async function createUser({ email, password, role, invitationKey }) {
  const {data} = await axios.post(`/api/auth.json?key=${invitationKey}`, {
    email, 
    password,
    role
  })

  return data
}