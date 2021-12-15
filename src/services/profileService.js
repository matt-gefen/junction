import * as tokenService from '../services/tokenService'

const BASE_URL = '/api/profiles'

async function getAllProfiles() {
  const res = await fetch(BASE_URL, {
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
  })
  return await res.json()
}

export { getAllProfiles }
