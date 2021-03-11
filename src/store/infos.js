import * as backend from '@/utils/backend'

const infos = {
  module: {
    namespaced: true,
    state: {
      infos_url: '',
      cluster_name: '',
      cluster_request_info: [
        'portal_user_count',
        'portal_version',
        'k8s_version',
        'k8s_node_count',
        'k8s_cpu_count',
        'k8s_mem_sum',
        'k8s_pod_count',
        'k8s_volume_count',
        'k8s_apiserver_url',
        'k8s_cluster_name'
      ],
      cluster_info: []
    },

    getters: {
      get_infos_url (state) { return state.infos_url },
      get_cluster_request_info (state) { return state.cluster_request_info },
      get_cluster_info (state) { return state.cluster_info },
      get_infos (state) { return state.infos },
      get_cluster_name (state) { return state.cluster_name }
    },

    mutations: {
      set_infos_url (state, infos_url) { state.infos_url = infos_url },
      set_cluster_info (state, info) { state.cluster_info = info },
      push_cluster_info (state, info) { state.cluster_info.push(info) },
      set_info (state, name, info) { state.infos[name] = info },
      set_cluster_name (state, name) { state.cluster_name = name }
    },

    actions: {
      async request_cluster_infos (context) {
        const response = await backend.get(context.state.infos_url)
        const links = response.data['links']
        for (const key in links) {
          backend.get(links[key]).then(info_response => {
            context.commit('push_cluster_info', info_response.data)
          })
        }
      },
      async request_cluster_name (context) {
        let response = await backend.get(`/cluster/k8s_cluster_name/`)
        console.log('CLUSTER NAME', response)
        context.commit('set_cluster_name', response.data.k8s_cluster_name)
      }
    }
  }
}

export default infos
