import * as backend from '@/utils/backend'
import moment from 'moment'
const ingresses_container = {
  module: {
    namespaced: true,
    state: {
      ingress_links: [],
      ingresses: []
    },

    getters: {
      get_ingress_links (state) { return state.ingress_links },
      get_ingresses (state) { return state.ingresses }
    },

    mutations: {
      set_ingress_links (state, ingress_links) { state.ingress_links = ingress_links },
      set_ingresses (state, ingresses) { state.ingresses = ingresses },
      push_ingress (state, ingress) { state.ingresses.push(ingress) }
    },

    actions: {
      async request_ingresses (context) {
        const ingress_links = context.getters['get_ingress_links']
        ingress_links.forEach(link => {
          backend.get(link).then(response => {
            let ingress = response.data
            console.log('INGRESSES', ingress)
            let data = {}
            data['name'] = ingress.name
            data['tls'] = ingress.tls
            data['annotations'] = ingress.annotations.map(anno => `${anno['key']}=${anno['value']} `)
            data['hosts'] = ingress.rules.map(rule => {
              let paths = rule.paths.map(path => `${path['path']}->${path['service_name']}:${path['service_port']}`)
              return rule.host + ' ' + paths
            })
            context.commit('push_ingress', data)
          })
        })
      }
    }
  }
}

export default ingresses_container
