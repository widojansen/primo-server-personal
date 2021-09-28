import { get } from 'svelte/store';

export const User = (user = {
  id: null,
  uid: null,
  username: null,
  email: null,
  verified: false,
  githubUsername: null,
  githubID: null,
  hosts: null,
  signedIn: false
  // domains: []
}) => ({
  id: user.id,
  uid: user.uid,
  username: user.username,
  email: user.email,
  verified: user.verified,
  type: user.type || 'email',
  githubUsername: user.githubUsername,
  githubID: user.githubID,
  role: ['developer', 'content'].includes(user.role) ? user.role : 'developer',
  signedIn: user.signedIn,
  // domains
})


