import * as backend from '@/utils/backend'
import moment from 'moment'
const pods_container = {
  module: {
    namespaced: true,
    state: {
      pod_links: [],
      pods: []
    },

    getters: {
      get_pod_links (state) { return state.pod_links },
      get_pods (state) { return state.pods }
    },

    mutations: {
      set_pod_links (state, pod_links) { state.pod_links = pod_links },
      set_pods (state, pods) { state.pods = pods },
      push_pod (state, pod) { state.pods.push(pod) }
    },

    actions: {
      async request_pods (context) {
        const pod_links = context.getters['get_pod_links']
        pod_links.forEach(link => {
          backend.get(link).then(response => {
            let pod = response.data
            console.log('PODS', pod)
            let data = {}
            data['name'] = pod.name
            data['creation_timestamp'] = moment(pod.creation_timestamp).format()
            data['containers'] = pod.containers.map((container) => container.image)
            context.commit('push_pod', data)
          })
        })
      }
    }
  }
}

export default pods_container
