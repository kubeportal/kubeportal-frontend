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
      get_user (state) { return state.user },
      get_webapps (state) { return state.webapps },
      get_groups (state) { return state.groups },
      get_dark_mode (state) { return state.dark_mode }
    },

    mutations: {
      set_access_token (state, token) { state.access_token = token },
      set_refresh_token (state, token) { state.refresh_token = token },
      set_url (state, url) { state.url = url },
      set_user (state, user) { state.user = user },
      push_webapp (state, webapp) { state.webapps.push(webapp) },
      push_group (state, group) { state.groups.push(group) },
      set_webapps (state, webapps) { state.webapps = webapps },
      set_groups (state, groups) { state.groups = groups },
      set_dark_mode (state) { state.dark_mode = !state.dark_mode }
    },

    actions: {
      async post_login_data (context, request_body) {
        let login_url = store.getters['api/get_login_url']
        console.log('LOGIN URL', login_url)
        const response = await backend.post(store.getters['api/get_login_url'], request_body)
        if (response) {
          console.log('POST LOGIN DATA', response.data)
          context.commit('set_access_token', response.data['access_token'])
          context.commit('set_refresh_token', response.data['refresh_token'])
          context.commit('set_url', response.data['links']['user'])
          store.commit('news/set_news_url', response.data['links']['news'])
          store.commit('infos/set_infos_url', response.data['links']['infos'])
          const user_details = await backend.get(response.data['links']['user'])
          console.log('USER DETAILS', user_details.data)
          context.commit('set_user', user_details.data)
          context.dispatch('request_namespaces')
        }
        return response
      },

      async authorize_google_user (context, auth_response) {
        const response = await backend.post(store.getters['api/get_login_google_url'], auth_response)
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
        const current_user = context.getters['get_user']
        for (const group_url of current_user['portal_groups']) {
          const response = await backend.get(group_url)
          console.log('GROUP', response.data)
          context.commit('push_group', response.data)
        }
      },
      async request_namespaces (context) {
        const current_user = context.getters['get_user']
        const response = await backend.get(current_user['k8s_namespaces'][0])
        console.log('NAMESPACE RESPONSE', response.data)
        store.commit('pods/set_pod_links', response.data['pods'])
        store.commit('deployments/set_deployment_links', response.data['deployments'])
        store.commit('services/set_service_links', response.data['services'])
        store.commit('ingresses/set_ingress_links', response.data['ingresses'])
        store.commit('pvcs/set_pvc_links', response.data['pvcs'])
      },
      async update_user (context, payload) {
        const response = await backend.patch(context.state.url, payload)
        context.commit('set_user', response.data)
      },
      log_out () {
        backend.post(store.getters['api/get_logout_url'])
      },
      async switch_dark_mode (context) {
        context.commit('set_dark_mode')
        return context.getters['get_dark_mode']
      }
    }
  }
}

export default users_container
