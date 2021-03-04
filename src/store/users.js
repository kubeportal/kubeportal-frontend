import Vue from 'vue'
import * as backend from '@/utils/backend'
import store from './store.js'

const users_container = {
  module: {
    namespaced: true,

    state: {
      access_token: '',
      refresh_token: '',
      url: '',
      namespace: '',
      group_ids: [],
      user: {
        webapp_ids: []
      },
      webapps: [],
      groups: [],
      dark_mode: false
    },

    getters: {
      get_access_token (state) { return state.access_token },
      get_refresh_token (state) { return state.refresh_token },
      get_url (state) { return state.url },
      get_namespace (state) { return state.namespace },
      get_user (state) { return state.user },
      get_webapps (state) { return state.webapps },
      get_group_ids (state) { return state.group_ids },
      get_groups (state) { return state.groups },
      get_dark_mode (state) { return state.dark_mode }
    },

    mutations: {
      set_access_token (state, token) { state.access_token = token },
      set_refresh_token (state, token) { state.refresh_token = token },
      set_url (state, url) { state.url = url },
      set_group_ids (state, group_ids) { state.group_ids = group_ids },
      set_namespace (state, namespace) { state.namespace = namespace },
      set_user (state, user) { state.user = user },
      push_webapp (state, webapp) { state.webapps.push(webapp) },
      push_group (state, group) { state.groups.push(group) },
      set_webapps (state, webapps) { state.webapps = webapps },
      set_dark_mode (state) { state.dark_mode = !state.dark_mode },
      set_groups (state, groups) { state.groups = groups }
    },

    actions: {
      async post_login_data (context, request_body) {
        let login_url = store.getters['api/get_login_url']
        console.log('LOGIN URL', login_url)
        const response = await backend.post(store.getters['api/get_login_url'], request_body)
        if (response) {
          console.log('POST LOGIN DATA', response.data)
          context.commit('set_access_token', response.data['access_token'])
          const user_details = await backend.get(response.data['user'])
          console.log('USER DETAILS', user_details.data)
          context.commit('set_user', user_details.data)
        }
        return response
      },

      async authorize_google_user (context, auth_response) {
        const response = await backend.post('/login_google/', auth_response)
        // @ TODO
        return response
      },
      async request_webapps (context) {
        const current_user = context.getters['get_user']
        console.log('CURRENT_USER', current_user)
        for (const webapp_url of current_user['webapps']) {
          const response = await backend.get(webapp_url)
          let res_data = response.data
          if (res_data.link_url.includes('{{namespace}}')) {
            res_data.link_url = res_data.link_url.replace('{{namespace}}', current_user['k8s_namespace_names'][0])
          }
          // @TODO: Service accounts are currently urls
          // if (res_data.link_url.includes('{{serviceaccount}}')) {
          //   res_data.link_url = res_data.link_url.replace('{{serviceaccount}}', current_user['get_namespace'])
          // }
          context.commit('push_webapp', response.data)
        }
      },
      async request_groups (context) {
        const group_ids = context.getters['get_group_ids']
        for (const group_id of group_ids) {
          const response = await backend.get(`/groups/${group_id}/`)
          context.commit('push_group', response.data)
        }
      },
      async update_user (context, payload) {
        const response = await backend.patch(context.state.url, payload)
        context.commit('set_details', response.data)
      },
      log_out () {
        backend.post('/logout/')
      },
      async switch_dark_mode (context) {
        context.commit('set_dark_mode')
        return context.getters['get_dark_mode']
      }
    }
  }
}

export default users_container
