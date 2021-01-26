import axios from 'axios'
import to from 'await-to-js'
import store from '../store/store.js'

function _check_header () {
  console.log('HEADER', axiosInstance.defaults.headers)
  if (!axiosInstance.defaults.headers['authorization'] || !axiosInstance.defaults.headers['X-CSRFToken']) {
    let token = store.getters['users/get_access_token']
    // eslint-disable-next-line
    axiosInstance.defaults.headers['authorization'] = !!token ? 'Bearer ' + token : undefined
    axiosInstance.defaults.headers['X-CSRFToken'] = store.getters['api/get_csrf_token']
  }
}

export function setBaseURLWithDefaultOrEnvValue () {
  const defaultUrl = 'https://cluster.datexis.com'
  const baseUrl = process.env['VUE_APP_BASE_URL'] ? process.env['VUE_APP_BASE_URL'] : defaultUrl
  // const API_VERSION = store.getters['api/get_api_version']
  const API_VERSION = 'v2.0.0'
  console.log(`BASEURL: ${baseUrl}/api/${API_VERSION}`)
  return `${baseUrl}/api/${API_VERSION}`
}

let config = {
  baseURL: setBaseURLWithDefaultOrEnvValue(),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
}

const axiosInstance = axios.create(config)
// const precall = axios.create(config) // only used for the initial request

export async function read (relative_path) {
  _check_header()
  if(relative_path === '/api/') {
    const defaultUrl = 'https://cluster.datexis.com'
    let baseURL = process.env['VUE_APP_BASE_URL'] ? process.env['VUE_APP_BASE_URL'] : defaultUrl

    let [error, response] = await to(axios.get(baseURL + relative_path))
    response === undefined ? console.log(error.message) : console.log(response)
    return response
  }
  let [error, response] = await to(axiosInstance.get(relative_path))
  response === undefined ? console.log(error.message) : console.log(response)
  return response
}

export async function create (relative_path, payload) {
  _check_header()
  let [error, response] = await to(axiosInstance.post(relative_path, payload))
  response === undefined ? console.log(error.message) : console.log(response)
  return response
}

export async function update (relative_path, payload) {
  _check_header()
  let [error, response] = await to(axiosInstance.patch(relative_path, payload))
  response === undefined ? console.log(error.message) : console.log(response)
  return response
}
