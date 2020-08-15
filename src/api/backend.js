import axios from 'axios'

const config = {
  baseURL: 'https://kubeportal-dev.api.datexis.com/',
  headers: {
    'Content-Type': 'application/json'
  }
}

export const axiosInstance = axios.create(config)

export async function read (collection, jwt) {
  axiosInstance.defaults.headers.common['Authorization'] = `token ${jwt}`
  try {
    const response = await axiosInstance.get(collection)
    return response.data
  } catch (e) {
    console.log(e)
  }
}

export async function readByField (collection, id, jwt) {
  axiosInstance.defaults.headers.common['Authorization'] = `token ${jwt}`
  console.log(`${collection}/${id}`)
  try {
    const response = await axiosInstance.get(`${collection}/${id}`)
    return response.data
  } catch (e) {
    console.log(e)
  }
}

export async function create (collection, payload) {
  try {
    const response = await axiosInstance.post(collection, payload)
    return response
  } catch (e) {
    console.log(e)
    return e
  }
}

