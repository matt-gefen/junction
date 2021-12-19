import * as tokenService from '../services/tokenService'

const BASE_URL = '/api/groups/'

export const createGroup= async (group) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
      body: JSON.stringify(group)
    })
    const data = await res.json()
    return data
  } catch (error) {
    throw error
  }
}

export const getGroupById = async (groupId) => {
  try {
    const res = await fetch(`${BASE_URL}${groupId}`,
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

export const createPost= async (groupId, post) => {
  try {
    console.log(groupId)
    const res = await fetch(`${BASE_URL}${groupId}/posts/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
      body: JSON.stringify(post)
    })
    const data = await res.json()
    return data
  } catch (error) {
    throw error
  }
}

export const getPostById = async (groupId, postId) => {
  try {
    const res = await fetch(`${BASE_URL}${groupId}/posts/${postId}`,
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

export const createComment= async (groupId, postId, comment) => {
  console.log('Creating comment')
  try {
    const res = await fetch(`${BASE_URL}${groupId}/posts/${postId}/comments`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
      body: JSON.stringify(comment)
    })
    const data = await res.json()
    return data
  } catch (error) {
    throw error
  }
}