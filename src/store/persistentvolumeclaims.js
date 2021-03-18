import * as backend from '@/utils/backend'
import moment from 'moment'
const persistentvolumeclaims_container = {
  module: {
    namespaced: true,
    state: {
      persistentvolumeclaims_link: '',
      persistentvolumeclaims: []
    },

    getters: {
      get_persistentvolumeclaims_link (state) { return state.persistentvolumeclaims_link },
      get_persistentvolumeclaims (state) { return state.persistentvolumeclaims }
    },

    mutations: {
      set_persistentvolumeclaims_link (state, persistentvolumeclaims_link) { state.persistentvolumeclaims_link = persistentvolumeclaims_link },
      set_persistentvolumeclaims (state, persistentvolumeclaims) { state.persistentvolumeclaims = persistentvolumeclaims },
      push_persistentvolumeclaim (state, persistentvolumeclaim) { state.persistentvolumeclaims.push(persistentvolumeclaim) }
    },

    actions: {
      async request_persistentvolumeclaims (context) {
        const persistentvolumeclaims_link = context.getters['get_persistentvolumeclaims_link']
        const persistentvolumeclaim_links = await backend.get(persistentvolumeclaims_link)
        persistentvolumeclaim_links.data['persistentvolumeclaim_urls'].forEach(link => {
          backend.get(link).then(response => {
            console.log('persistentvolumeclaims', response.data)
            let persistentvolumeclaim = response.data
            let data = {}
            data['name'] = persistentvolumeclaim.name
            data['creation_timestamp'] = moment(persistentvolumeclaim.creation_timestamp).format()
            data['size'] = persistentvolumeclaim.size
            context.commit('push_persistentvolumeclaim', data)
          })
        })
      }
    }
  }
}

export default persistentvolumeclaims_container
