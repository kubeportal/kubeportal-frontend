import * as backend from '@/utils/backend'
import moment from 'moment'
const services_container = {
  module: {
    namespaced: true,
    state: {
      service_links: [],
      services: []
    },

    getters: {
      get_service_links (state) { return state.service_links },
      get_services (state) { return state.services }
    },

    mutations: {
      set_service_links (state, service_links) { state.service_links = service_links },
      set_services (state, services) { state.services = services },
      push_service (state, service) { state.services.push(service) }
    },

    actions: {
      async request_services (context) {
        const service_links = context.getters['get_service_links']
        service_links.forEach(link => {
          backend.get(link).then(response => {
            let service = response.data
            console.log('SERVICES', service)
            let data = {}
            data['name'] = service.name
            data['type'] = service.type
            data['selector'] = service.selector.map(sel => `${sel['key']} ${sel['value']} ,`)
            data['ports'] = service.ports.map(port => `${port['protocol']}:${port['port']} ,`)
            context.commit('push_service', data)
          })
        })
      }
    }
  }
}

export default services_container
