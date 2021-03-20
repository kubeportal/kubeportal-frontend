import * as backend from '@/utils/backend'
import moment from 'moment'
const ingresses_container = {
  module: {
    namespaced: true,
    state: {
      ingresses_link: [],
      ingresses: []
    },

    getters: {
      get_ingresses_link (state) { return state.ingresses_link },
      get_ingresses (state) { return state.ingresses }
    },

    mutations: {
      set_ingresses_link (state, ingresses_link) { state.ingresses_link = ingresses_link },
      set_ingresses (state, ingresses) { state.ingresses = ingresses },
      push_ingress (state, ingress) { state.ingresses.push(ingress) }
    },

    actions: {
      async request_ingresses (context) {
        const ingresses_link = context.getters['get_ingresses_link']
        const ingress_links = await backend.get(ingresses_link)
        ingress_links.data['ingress_urls'].forEach(link => {
          backend.get(link).then(response => {
            let ingress = response.data
            console.log('INGRESSES', ingress)
            let data = {}
            data['name'] = ingress.name
            data['tls'] = ingress.tls
            data['annotations'] = ingress.annotations.map(anno => `${anno['key']}=${anno['value']}`)
            data['hosts'] = ingress.rules.map(rule => { return rule.host })
            let services = ingress.rules.map(rule => {
              return rule.paths.map(path => `${path['service_name']}:${path['service_port']}`)
            })
            data['services'] = services[0] === 'null' ? '-' : services
            let path = ingress.rules.map(rule => {
              return rule.paths.map(path => `${path['path']}`).join(' ')
            })
            data['path'] = path[0] === 'null' ? '-' : path
            context.commit('push_ingress', data)
          })
        })
      }
    }
  }
}

export default ingresses_container
