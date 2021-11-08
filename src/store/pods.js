import * as backend from '@/utils/backend'
import moment from 'moment'

const pods_container = {
  module: {
    namespaced: true,
    state: {
      pods_link: '',
      pods: [],
      pod_logs: {},
      scroll_id: false,
      page_number: 0
    },

    getters: {
      get_pods_link (state) {
        return state.pods_link
      },
      get_pods (state) {
        return state.pods
      },
      get_pod_logs (state) {
        return state.pod_logs
      },
      get_scroll_id (state) {
        return state.scroll_id
      },
      get_page_number (state) {
        return state.page_number
      }
    },

    mutations: {
      set_pods_link (state, pods_link) {
        state.pods_link = pods_link
      },
      set_pods (state, pods) {
        state.pods = pods
      },
      push_pod (state, pod) {
        state.pods.push(pod)
      },
      set_pod_logs (state, data) {
        let tmp = {}
        tmp[data.pod_name] = data.logs
        state.pod_logs = { ...state.pod_logs, ...tmp }
      },
      set_scroll_id (state, scroll_id) {
        state.scroll_id = scroll_id
      },
      set_page_number (state, page_number) {
        state.page_number = page_number
      }
    },

    actions: {
      async request_pods (context) {
        context.commit('set_pods', [])
        const pods_link = context.getters['get_pods_link']
        let pod_links = await backend.get(pods_link)
        pod_links.data['pod_urls'].forEach(link => {
          backend.get(link).then(response => {
            let pod = response.data
            let data = {}
            data = { ...pod }
            data['creation_timestamp'] = moment(pod.creation_timestamp).fromNow()
            data['start_timestamp'] = moment(pod.start_timestamp).fromNow()
            data['containers'] = pod.containers.map(container => container.name)
            data['images'] = pod.containers.map(container => container.image)
            data['volume_names'] = pod.containers.map(container =>
              container.volume_mounts.map(volume => volume.volume.name))[0]
            data['volume_type'] = pod.containers.map(container =>
              container.volume_mounts.map(volume => volume.volume.type)[0])
            data['mountpath'] = pod.containers.map(container => container.volume_mounts.map(volume => volume.mount_path))[0]
            data['volumes'] = pod.containers.map(container => container.volume_mounts)[0]
            data['logs_url'] = pod.logs_url
            console.log('POD ', data)
            context.commit('push_pod', data)
          })
        })
      },
      async create_pod (context, data) {
        const pods_link = context.getters['get_pods_link']
        const response = await backend.post(pods_link, data)
        console.log('CREATE POD RESPONSE', response)
      },
      async request_scroll_logs (context, data) {
        let link = 'http://localhost:5000/getscrolllogs/'
        const response = await backend.post(link, { ns_name: data.namespace, pod_name: data.pod_name, scroll_id: context.getters['get_scroll_id'] })
        console.log('request logs', response.data)
        let result = response.data.hits.map(hit => {
          let log = {}
          log['log'] = hit._source.log
          log['_id'] = hit._id
          log['stream'] = hit._source.stream
          //log['timestamp'] = moment(hit._source['@timestamp']).format('MMMM Do YYYY, h:mm:ss a')
          return log
        })
        let scroll_id = response.data['scroll_id']
        context.commit('set_pod_logs', { pod_name: data.pod_name, logs: result })
        context.commit('set_scroll_id', scroll_id)
      },
      async request_logs (context, data) {
        let link = 'http://localhost:5000/getpodlogs/'
        const response = await backend.post(link, { ns_name: data.namespace, pod_name: data.pod_name, page_number: context.getters['get_page_number'] })
        console.log('request logs', response)
        let result = response.data.hits.map(hit => {
          let log = {}
          log['log'] = hit._source.log
          log['stream'] = hit._source.stream
          log['timestamp'] = moment(hit._source['@timestamp']).format('MMMM Do YYYY, h:mm:ss a')
          return log
        })
        context.commit('set_pod_logs', { pod_name: data.pod_name, logs: result })
        context.commit('set_page_number', response.data.page_number)
      },
      async request_test_logs (context, data) {
        let link = 'http://localhost:8000' + data.logs_url
        const response = await backend.get(link, { ns_name: data.namespace, pod_name: data.pod_name })
        console.log('request logs', response)
        let result = response.data.hits.map(hit => {
          let log = {}
          log['log'] = hit.log
          log['stream'] = hit.stream
          log['timestamp'] = moment(hit.time).format('MMMM Do YYYY, h:mm:ss a')
          return log
        })
        context.commit('set_pod_logs', { pod_name: data.pod_name, logs: result })
      }
    }
  }
}

export default pods_container
