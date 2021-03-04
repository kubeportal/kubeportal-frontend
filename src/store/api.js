import * as backend from '@/utils/backend'

const api_container = {
  module: {
    namespaced: true,

    state: {
      csrf_token: '',
      login_url: '',
      login_google_url: ''
    },
    getters: {
      get_csrf_token (state) { return state.csrf_token },
      get_login_url (state) { return state.login_url },
      get_login_google_url (state) { return state.login_google_url }
    },

    mutations: {
      set_csrf_token (state, csrf_token) { state.csrf_token = csrf_token },
      set_login_url (state, login_url) { state.login_url = login_url },
      set_login_google_url (state, login_google_url) { state.login_google_url = login_google_url }
    },

    actions: {
      async get_basic_api_information (context) {
        let response = await backend.get('')
        context.commit('set_csrf_token', response.data['csrf_token'])
        context.commit('set_login_url', response.data['links']['login'])
        context.commit('set_login_google_url', response.data['links']['login_google'])
        console.log(context.getters['get_login_url'])
        console.log(context.getters['get_login_google_url'])
      }
    }
  }
}

export default api_container
