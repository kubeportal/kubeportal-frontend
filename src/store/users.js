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
      // get_firstname (state) { return state.firstname },
      get_webapps (state) { return state.webapps },
      get_groups (state) { return state.groups },
      get_dark_mode (state) { return state.dark_mode }
    },

    mutations: {
      set_access_token (state, token) { state.access_token = token },
      set_user_id (state, id) { state.user_id = id },
      set_namespace (state, namespace) { state.namespace = namespace },
      // set_firstname (state, name) { state.user_firstname = name },
      set_details (state, details) { state.details = details },
      push_webapp (state, webapp) { state.webapps.push(webapp) },
      set_webapps (state, webapps) { state.webapps = webapps },
      set_dark_mode (state) { state.dark_mode = !state.dark_mode },
      set_groups (state, groups) { state.groups = groups }
    },

    actions: {
      async get_details (context) {
        const response = await backend.read(`/users/${context.state.user_id}/`)
        console.log('USER DETAILS', response.data)
        response !== undefined ? context.commit('set_details', response.data) : console.log('login failed')
        return response
      },
      async post_login_data (context, request_body) {
        const response = await backend.create('/login/', request_body)
        if (response) {
          console.log('POST LOGIN DATA', response.data)
          context.commit('set_user_id', response.data['user_id'])
          context.commit('set_namespace', response.data['namespace'])
          context.commit('set_access_token', response.data['access_token'])
        }
        return response
      },

      async authorize_google_user (context, auth_response) {
        const response = await backend.create('/google_login/', auth_response)
        // @ TODO
        return response
      },
      async request_webapps (context) {
        const current_user = context.getters['get_details']
        console.log('WEBAPP IDS', current_user['webapp_ids'])
        console.log('CURRENT USER', current_user)
        for (const webapp_id of current_user['webapp_ids']) {
          const response = await backend.read(`/webapps/${webapp_id}/`)
          !response ? console.log('no webapps found', response) : context.commit('push_webapp', response.data)
        }
      },
      async get_groups (context) {
        const response = await backend.read(`/users/${context.state.user_id}/groups/`)
        context.commit('set_groups', response.data)
        return response
      },
      async update_user (context, payload) {
        const response = await backend.update(`/users/${context.state.user_id}/`, payload)
        context.commit('set_details', response.data)
        return response
      },
      async switch_dark_mode (context) {
        context.commit('set_dark_mode')
        return context.getters['get_dark_mode']
      }
    }
  }
}

export default users_container
