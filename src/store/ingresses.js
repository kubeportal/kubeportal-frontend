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
      set_ingress_host_status (state, index, status) { console.log('INDEX', index, status); state.ingresses[index].status = status },
      push_ingress (state, ingress) { state.ingresses.push(ingress) }
    },

    actions: {
      async request_ingresses (context) {
        context.commit('set_ingresses', [])
        const ingresses_link = context.getters['get_ingresses_link']
        const ingress_links = await backend.get(ingresses_link)
        ingress_links.data['ingress_urls'].forEach((link, index) => {
          backend.get(link).then(response => {
            let ingress = response.data
            // console.log('INGRESSES', ingress)
            if (ingress) {
              let data = {}
              data['name'] = ingress.name
              data['tls'] = ingress.tls
              data['creation_timestamp'] = moment(ingress.creation_timestamp).fromNow()
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
              data['status'] = 'pending'
              data['formatted_annotations'] = data['annotations'].join('<br>')
              data['formatted_services'] = data['services'].join('')
              data['formatted_path'] = data['path'].join('')
              data['formatted_host_links'] = data['host_links'].join('<br>')
              console.log('INGRESS_DATA', data)
              context.commit('push_ingress', data)
              //@TODO: multiple hosts?
              context.dispatch('check_availablity', { host: data['hosts'][0], index })
            }
          })
        })
      },
      async check_availablity (context, data) {
        console.log(data)
        backend.get(data.host).then(response => {
          console.log(response)
          let status = response ? 200 : 300
          context.commit('set_ingress_host_status', data.index, status)
        })
        // console.log('host: ' + host)
        // const XHR = new XMLHttpRequest()
        // XHR.open('OPTIONS', host)
        // let loading = () => {
        //   let status
        //   if (XHR.status < 300 && XHR.status >= 200) {
        //     // console.log(XHR.status)
        //     status = 200
        //   } else {
        //     // console.warn(XHR.statusText, XHR.responseText)
        //     status = XHR.status
        //   }
        //   context.commit('set_ingress_host_status', index, status)
        //   // console.log(ingress['status'])
        // }
        // XHR.addEventListener('load', loading)
        // XHR.send()
        // context.commit('set_ingresses', [])
        // context.commit('set_ingresses', modified_ingresses)
      },
      async create_ingress (context, data) {
        const ingresses_link = context.getters['get_ingresses_link']
        const response = await backend.post(ingresses_link, data)
        console.log('CREATE INGRESS RESPONSE', response)
      }
    }
  }
}

export default ingresses_container
