import axios from 'axios'
import store from '../store/store.js'

let base_url = process.env['VUE_APP_BASE_URL']

function _set_header () {
  console.log('HEADER', axios.defaults.headers)
  if (!axios.defaults.headers['authorization'] || !axios.defaults.headers['X-CSRFToken']) {
    let token = store.getters['users/get_access_token']
    // eslint-disable-next-line
    axios.defaults.headers['authorization'] = !!token ? 'Bearer ' + token : undefined
    axios.defaults.headers['X-CSRFToken'] = store.getters['api/get_csrf_token']
    base_url = process.env['VUE_APP_BASE_URL'] + '/api/' + store.getters['api/get_api_version']
    console.log('BASE_URL_SET_HEADER', base_url)
  }
}

export async function get (relative_path) {
  _set_header()
  if (relative_path === '') {
    let response = await axios.get(process.env['VUE_APP_BASE_URL'] + '/api/')
    base_url = process.env['VUE_APP_BASE_URL'] + '/api/' + response.data['default_api_version']
    console.log('GET' + relative_path, response)
    return response
  }
  let response = await axios.get(base_url + relative_path)
  console.log('GET' + relative_path, response)
  return response
}

export async function post (relative_path, payload) {
  _set_header()
  if (relative_path === '/login/') {
    axios.defaults.headers['authorization'] = undefined
  }
  console.log('LOGIN BASE_URL', base_url)
  let response = await axios.post(base_url + relative_path, payload)
  console.log('POST' + relative_path, response)
  return response
}

export async function patch (relative_path, payload) {
  _set_header()
  let response = await axios.patch(base_url + relative_path, payload)
  console.log('PATCH' + relative_path, response)
  return response
}
