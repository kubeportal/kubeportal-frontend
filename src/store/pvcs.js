import * as backend from '@/utils/backend'
import moment from 'moment'
const pvcs_container = {
  module: {
    namespaced: true,
    state: {
      pvc_links: [],
      pvcs: []
    },

    getters: {
      get_pvc_links (state) { return state.pvc_links },
      get_pvcs (state) { return state.pvcs }
    },

    mutations: {
      set_pvc_links (state, pvc_links) { state.pvc_links = pvc_links },
      set_pvcs (state, pvcs) { state.pvcs = pvcs },
      push_pvc (state, pvc) { state.pvcs.push(pvc) }
    },

    actions: {
      async request_pvcs (context) {
        const pvc_links = context.getters['get_pvc_links']
        pvc_links.forEach(link => {
          backend.get(link).then(response => {
            console.log('PVCS', response.data)
            let pvc = response.data
            context.commit('push_pvc', JSON.stringify(pvc))
          })
        })
      }
    }
  }
}

export default pvcs_container
