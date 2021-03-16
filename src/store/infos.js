import * as backend from '@/utils/backend'

const infos = {
  module: {
    namespaced: true,
    state: {
      infos_url: '',
      cluster_name: '',
      cluster_links: [],
      cluster_info: []
    },

    getters: {
      get_infos_url (state) { return state.infos_url },
      get_cluster_links (state) { return state.cluster_links },
      get_cluster_info (state) { return state.cluster_info },
      get_infos (state) { return state.infos },
      get_cluster_name (state) { return state.cluster_name }
    },

    mutations: {
      set_infos_url (state, infos_url) { state.infos_url = infos_url },
      set_cluster_links (state, links) { state.cluster_links = links },
      set_cluster_info (state, info) { state.cluster_info = info },
      push_cluster_info (state, info) { state.cluster_info.push(info) },
      set_info (state, name, info) { state.infos[name] = info },
      set_cluster_name (state, name) { state.cluster_name = name }
    },

    actions: {
      async request_cluster_infos (context) {
        const response = await backend.get(context.state.infos_url)
        const links = response.data['info_urls']
        context.commit('set_cluster_links', links)
        for (const key in links) {
          backend.get(links[key]).then(info_response => {
            context.commit('push_cluster_info', info_response.data)
          })
        }
      },
      async request_cluster_name (context) {
        const cluster_links = context.getters['get_cluster_links']
        let response = await backend.get(cluster_links['k8s_cluster_name'])
        console.log('CLUSTER NAME', response)
        context.commit('set_cluster_name', response.data['k8s_cluster_name'])
      }
    }
  }
}

export default infos
