import Vue from 'vue'
import * as backend from '@/api/backend'

const generator = {
  module: {
    namespaced: true,

    state: {
      deployment_name: '',
      image_name: '',
      container_name: '',
      container_port: '',
      target_port: '',
      service_port: '',
      namespace: '',
      service_name: '',
      ingress_name: '',
      domain_name: '',
      subdomain: '',
      hostname_valid: '',
      current_generator_tab: 'Deployment'
    },

    getters: {
      get_deployment_name (state) { return state.deployment_name },
      get_image_name (state) { return state.image_name },
      get_container_name (state) { return state.container_name },
      get_container_port (state) { return state.container_port },
      get_service_port (state) { return state.service_port },
      get_namespace (state) { return state.namespace },
      get_service_name (state) { return state.service_name },
      get_domain_name (state) { return state.domain_name },
      get_subdomain (state) { return state.subdomain },
      get_ingress_name (state) { return state.ingress_name },
      get_hostname_valid (state) { return state.hostname_valid },
      get_current_generator_tab (state) { return state.current_generator_tab }
    },

    mutations: {
      set_deployment_name (state, name) { state.deployment_name = name },
      set_target_tort (state, port) { state.target_port = port },
      set_service_port (state, port) { state.service_port = port },
      set_service_name (state, name) { state.service_name = name },
      set_namespace (state, namespace) { state.namespace = namespace },
      set_ingress_name (state, ingress_name) { state.ingress_name = ingress_name },
      set_container_port (state, port) { state.container_port = port },
      set_container_name (state, name) { state.container_name = name },
      set_image_name (state, name) { state.image_name = name },
      set_domain_name (state, name) { state.domain_name = name },
      set_subdomain (state, name) { state.subdomain = name },
      set_hostname_validation (state, valid) { state.validate_hostname = valid },
      set_current_generator_tab (state, tab) { state.current_generator_tab = tab }
    },

    actions: {
      async validate_hostname (context, payload) {
        let request_body = { 'hostname' : payload }
        const validation = await backend.create('/check/ingress/', request_body)
        console.log(validation)
        context.commit('setHostnameValidation', validation)
      }
    }
  }
}

export default generator
