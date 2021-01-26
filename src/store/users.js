import Vue from 'vue'
import * as backend from '@/utils/backend'
import store from './store.js'

const users_container = {
  module: {
    namespaced: true,

    state: {
      access_token: '',
      user_id: null,
      firstname: '',
      namespace: '',
      is_authenticated: '',
      details: {},
      webapps: [],
      groups: [],
      dark_mode: false
    },

    getters: {
      get_access_token (state) { return state.access_token },
      get_details (state) { return state.details },
      get_user_id (state) { return state.user_id },
      get_firstname (state) { return state.firstname },
      get_webapps (state) { return state.webapps },
      get_is_authenticated (state) { return state.is_authenticated },
      get_groups (state) { return state.groups },
      get_dark_mode (state) { return state.dark_mode }
    },

    mutations: {
      set_access_token (state, token) { state.access_token = token },
      set_user_id (state, id) { state.user_id = id },
      set_firstname (state, name) { state.user_firstname = name },
      set_details (state, details) { state.details = details },
      set_webapps (state, webapps) { state.user_webapps = webapps },
      set_is_authenticated (state, is_authenticated) { state.is_authenticated = is_authenticated },
      set_dark_mode (state) { state.dark_mode = !state.dark_mode },
      set_groups (state, groups) { state.groups = groups },
      set_namespace (state, namespace) { state.namespace = namespace }
    },

    actions: {
      async get_details (context, id) {
        const response = await backend.read(`/users/${id}/`)
        response !== undefined ? context.commit('set_details', response.data) : console.log('login failed')
        return response
      },
      async post_login_data (context, request_body) {
        const response = await backend.create('/login/', request_body)
        if (response) {
          console.log(response.data)
          context.commit('set_user_id', response.data['user_id'])
          context.commit('set_namespace', response.data['namespace'])
          context.commit('set_access_token', response.data['jwt'])
        }
        return response
      },
      async authorize_google_user (context, auth_response) {
        const response = await backend.create('/google_login/', auth_response)
        // @ TODO
        return response
      },
      async request_webapps (context) {
        const response = await backend.read(`/users/${context.state.user_id}/webapps/`)
        response !== undefined ? context.commit('set_webapps', response.data) : console.log('no webapps found')
        return response
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
