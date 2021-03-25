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
            data['creation_timestamp'] = moment(ingress.creation_timestamp).format()
            data['annotations'] = ingress.annotations.map(anno => { return `${anno['key']}: ${anno['value']}` })
            data['hosts'] = ingress.rules.map(rule => {
              return rule.paths.map(path => {
                return data['tls']
                  ? `https://${rule.host}${path['path']}`
                  : `http://${rule.host}${path['path']}`
              })
            })[0]
            data['host_links'] = data['hosts'].map(host => {
              return `<a href=${host}>${host}</a>`
            })

            data['services'] = ingress.rules.map(rule => {
              return rule.paths.map(path => `${path['service_name']}:${path['service_port']}`)
            })[0]
            data['path'] = ingress.rules.map(rule => {
              return rule.paths.map(path => `${path['path']}`)
            })[0]
            data['status'] = []
            data['formatted_annotations'] = data['annotations'].join('<br>')
            data['formatted_services'] = data['services'].join('')
            data['formatted_path'] = data['path'].join('')
            data['formatted_host_links'] = data['host_links'].join('<br>')
            context.commit('push_ingress', data)
          })
        })
        await context.dispatch('check_availablity')
      },
      async check_availablity (context) {
        const ingresses = context.getters['get_ingresses']
        console.log('check availability')
        console.log(ingresses)
        let modified_ingresses = ingresses.map(ingress => {
          console.log('ingress: ' + ingress)
          ingress.hosts.map(host => {
            console.log('host: ' + host)
            const XHR = new XMLHttpRequest()
            XHR.open('OPTIONS', host)
            let loading = () => {
              if (XHR.status < 300 && XHR.status >= 200) {
                console.log(XHR.status)
                ingress['status'].push(200)
              } else {
                console.warn(XHR.statusText, XHR.responseText)
                ingress['status'].push(XHR.status)
              }
              console.log('dddddddddddddddddddddddddddddd')
              console.log(ingress['status'])
            }
            XHR.addEventListener('load', loading)
            XHR.send()
          })
        })
        console.log('########################################')
        console.log(modified_ingresses)
        context.commit('set_ingresses', [])
        context.commit('set_ingresses', modified_ingresses)
      }
    }
  }
}

export default ingresses_container
