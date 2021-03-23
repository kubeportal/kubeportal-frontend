import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import store from '../store/store.js'
let base_url = process.env['VUE_APP_BASE_URL']
const API_VERSION = 'v2.1.0'

let config = {
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
}

const axiosInstance = axios.create(config)

//const refresh_auth_logic = failed_request => axiosInstance.post(store.getters['users/get_refresh_token_url']).then(token_refresh_response => {
const refresh_auth_logic = failed_request => post('http://127.0.0.1:8000/api/v2.1.0/token/refresh/', { refresh: store.getters['users/get_refresh_token'] }).then(token_refresh_response => {
  store.commit('users/set_access_token', token_refresh_response.data['access'])
  console.log('HEADER BEFORE', axiosInstance.defaults.headers)
  axiosInstance.defaults.headers['authorization'] = 'Bearer ' + token_refresh_response.data['access']
  console.log('HEADER AFTER', axiosInstance.defaults.headers)
  return Promise.resolve()
})

axiosInstance.interceptors.request.use(request => {
  request.headers['authorization'] = 'Bearer ' + store.getters['users/get_access_token']
  return request
})

createAuthRefreshInterceptor(axiosInstance, refresh_auth_logic)

function _set_header () {
  console.log('HEADER', axiosInstance.defaults.headers)
  if (!axiosInstance.defaults.headers['authorization'] || !axiosInstance.defaults.headers['X-CSRFToken']) {
    let token = store.getters['users/get_access_token']
    // eslint-disable-next-line
    axiosInstance.defaults.headers['authorization'] = !!token ? 'Bearer ' + token : undefined
    axiosInstance.defaults.headers['X-CSRFToken'] = store.getters['api/get_csrf_token']
    console.log('BASE_URL_SET_HEADER', base_url)
  }
}

export async function get (absolute_url) {
  _set_header()
  try {
    if (absolute_url === '') {
      axiosInstance.defaults.headers['authorization'] = undefined
      let response = await axiosInstance.get(base_url + '/api/' + API_VERSION + '/')
      console.log('GET ' + absolute_url, response)
      return response
    }
    let response = await axiosInstance.get(absolute_url)
    console.log('GET' + absolute_url, response)
    return response
  } catch {
    return undefined
  }
}

export async function post (absolute_url, payload) {
  _set_header()
  if (absolute_url.includes('/login/')) {
    axiosInstance.defaults.headers['authorization'] = undefined
  }
  try {
    let response = await axiosInstance.post(absolute_url, payload)
    console.log('POST ' + absolute_url, response)
    return response
  } catch {
    return undefined
  }
}

export async function patch (absolute_url, payload) {
  _set_header()
  try {
    let response = await axiosInstance.patch(absolute_url, payload)
    console.log('PATCH ' + absolute_url, response)
    return response
  } catch {
    return undefined
  }
}
