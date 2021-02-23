import * as backend from '@/utils/backend'

const api_container = {
  module: {
    namespaced: true,

    state: {
      csrf_token: '',
      api_version: '',
      portal_version: ''
    },
    getters: {
      get_csrf_token (state) { return state.csrf_token },
      get_api_version (state) { return state.api_version },
      get_portal_version (state) { return state.portal_version }
    },

    mutations: {
      set_csrf_token (state, csrf_token) { state.csrf_token = csrf_token },
      set_api_version (state, api_version) { state.api_version = api_version },
      set_portal_version (state, portal_version) { state.portal_version = portal_version }
    },

    actions: {
      async get_basic_api_information (context) {
        let response = await backend.get('')
        context.commit('set_csrf_token', response.data['csrf_token'])
        context.commit('set_api_version', response.data['default_api_version'])
      }
    }
  }
}

export default api_container
