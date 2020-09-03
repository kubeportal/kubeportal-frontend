import axios from 'axios'

const API_BASE_URL = setBaseURLWithDefaultOrEnvValue()

function canReadURLFromEnv () {
  return !!process.env['API_BASE_URL']
}

export function setBaseURLWithDefaultOrEnvValue () {
  const API_VERSION = 'v1.0.0'
  const defaultUrl = '127.0.0.1:8000'
  const baseUrl = canReadURLFromEnv() ? process.env['VUE_APP_BASE_URL'] : defaultUrl
  return `${baseUrl}${API_VERSION}/`
}

const config = {
  baseURL: API_BASE_URL,
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
