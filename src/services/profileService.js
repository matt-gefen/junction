import * as tokenService from '../services/tokenService'

const BASE_URL = '/api/profiles'

async function getAllProfiles() {
  const res = await fetch(BASE_URL, {
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
  })
  return await res.json()
}

async function getProfile(profileId) {
  const res = await fetch(`${BASE_URL}/${profileId}`, {
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
  })
  return await res.json()
}

export const getProfileById = async (profileId) => {
  try {
    const res = await fetch(`${BASE_URL}/${profileId}`,
    {
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
    }})
    const data = await res.json()
    return data
  } catch (error) {
    throw error
  }
}

export { getAllProfiles, getProfile }
