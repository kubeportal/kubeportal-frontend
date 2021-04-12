import * as backend from '@/utils/backend'
import moment from 'moment'
const persistentvolumeclaims_container = {
  module: {
    namespaced: true,
    state: {
      pvc_link: '',
      persistentvolumeclaims: []
    },

    getters: {
      get_pvc_link (state) { return state.pvc_link },
      get_persistentvolumeclaims (state) { return state.persistentvolumeclaims }
    },

    mutations: {
      set_pvc_link (state, pvc_link) { state.pvc_link = pvc_link },
      set_persistentvolumeclaims (state, persistentvolumeclaims) { state.persistentvolumeclaims = persistentvolumeclaims },
      push_persistentvolumeclaim (state, persistentvolumeclaim) { state.persistentvolumeclaims.push(persistentvolumeclaim) }
    },

    actions: {
      async request_persistentvolumeclaims (context) {
        context.commit('set_persistentvolumeclaims', [])
        const pvc_link = context.getters['get_pvc_link']
        const persistentvolumeclaim_links = await backend.get(pvc_link)
        persistentvolumeclaim_links.data['persistentvolumeclaim_urls'].forEach(link => {
          backend.get(link).then(response => {
            let persistentvolumeclaim = response.data
            let data = {}
            data['name'] = persistentvolumeclaim.name
            data['creation_timestamp'] = moment(persistentvolumeclaim.creation_timestamp).format()
            data['size'] = persistentvolumeclaim.size
            data['access_mode'] = persistentvolumeclaim.access_modes
            data['phase'] = persistentvolumeclaim.phase
            context.commit('push_persistentvolumeclaim', data)
          })
        })
      },
      async create_pvc (context, data) {
        const pvc_link = context.getters['get_pvc_link']
        const response = await backend.post(pvc_link, data)
        console.log('CREATE PVC RESPONSE', response)
      }
    }
  }
}

export default persistentvolumeclaims_container
