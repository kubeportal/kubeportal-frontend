import Vue from 'vue'
import * as backend from '@/utils/backend'
import store from './store.js'

const users_container = {
  module: {
    namespaced: true,

    state: {
      access_token: '',
      user_id: null,
      namespace: '',
      group_ids: [],
      details: {
        webapp_ids: []
      },
      webapps: [],
      groups: [],
      dark_mode: false
    },

    getters: {
      get_access_token (state) { return state.access_token },
      get_user_id (state) { return state.user_id },
      get_namespace (state) { return state.namespace },
      get_details (state) { return state.details },
      get_webapps (state) { return state.webapps },
      get_group_ids (state) { return state.group_ids },
      get_groups (state) { return state.groups },
      get_dark_mode (state) { return state.dark_mode }
    },

    mutations: {
      set_access_token (state, token) { state.access_token = token },
      set_user_id (state, id) { state.user_id = id },
      set_group_ids (state, group_ids) { state.group_ids = group_ids },
      set_namespace (state, namespace) { state.namespace = namespace },
      set_details (state, details) { state.details = details },
      push_webapp (state, webapp) { state.webapps.push(webapp) },
      push_group (state, group) { state.groups.push(group) },
      set_webapps (state, webapps) { state.webapps = webapps },
      set_dark_mode (state) { state.dark_mode = !state.dark_mode },
      set_groups (state, groups) { state.groups = groups }
    },

    actions: {
      async get_details (context) {
        const response = await backend.get(`/users/${context.state.user_id}/`)
        console.log('USER DETAILS', response.data)
        response !== undefined ? context.commit('set_details', response.data) : console.log('login failed')
        return response
      },
      async post_login_data (context, request_body) {
        const response = await backend.post('/login/', request_body)
        if (response) {
          console.log('POST LOGIN DATA', response.data)
          context.commit('set_user_id', response.data['user_id'])
          context.commit('set_namespace', response.data['k8s_namespace'])
          context.commit('set_access_token', response.data['access_token'])
          context.commit('set_group_ids', response.data['group_ids'])
        }
        return response
      },

      async authorize_google_user (context, auth_response) {
        const response = await backend.post('/google_login/', auth_response)
        // @ TODO
        return response
      },
      async request_webapps (context) {
        const current_user = context.getters['get_details']
        for (const webapp_id of current_user['webapp_ids']) {
          const response = await backend.get(`/webapps/${webapp_id}/`)
          let res_data = response.data
          if (res_data.link_url.includes('{{namespace}}')) {
            res_data.link_url = res_data.link_url.replace('{{namespace}}', context.getters['get_namespace'])
          }
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
        const response = await backend.put(`/users/${context.state.user_id}/`, payload)
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
