import * as backend from '@/utils/backend'
import moment from 'moment'

const initial_state = () => {
  return {
    pods_link: '',
    pods: [],
    pod_logs: {},
    page_numbers: {}
  }
}

const pods_container = {
  module: {
    namespaced: true,
    state: initial_state,

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
      get_page_numbers (state) {
        return state.page_numbers
      }
    },

    mutations: {
      reset (state) {
        const s = initial_state()
        Object.keys(s).forEach(key => {
          state[key] = s[key]
        })
      },
      set_pods_link (state, pods_link) {
        state.pods_link = pods_link
      },
      set_pods (state, pods) {
        state.pods = pods
      },
      push_pod (state, pod) {
        state.pods.push(pod)
      },
      push_pod_logs (state, data) {
        if (state.pod_logs[data.pod_name] === undefined) {
          state.pod_logs[data.pod_name] = []
        }
        state.pod_logs[data.pod_name] = [...data.logs, ...state.pod_logs[data.pod_name]]
        state.pod_logs = { ...state.pod_logs }
      },
      append_pod_logs (state, data) {
        if (state.pod_logs[data.pod_name] === undefined) {
          state.pod_logs[data.pod_name] = []
        }
        state.pod_logs[data.pod_name] = [...state.pod_logs[data.pod_name], ...data.logs]
        state.pod_logs = { ...state.pod_logs }
      },
      set_page_number (state, data) {
        state.page_numbers[data.pod_name] = data.page_number
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
      async request_logs (context, data) {
        let current_page = context.getters['get_page_numbers']
        current_page = current_page[data.pod_name] ? current_page[data.pod_name] : 0
        let link = 'http://localhost:8000' + data.logs_url.replace('{page}', current_page)
        console.log(link, current_page)
        console.log('current_page', current_page)
        const response = await backend.get(link)
        console.log('request logs', response)
        let result = response.data.hits.map(hit => {
          let log = {}
          log['log'] = hit._source.log
          log['stream'] = hit._source.stream
          log['timestamp'] = moment(hit._source['@timestamp']).format('MMMM Do YYYY, h:mm:ss a')
          log['_id'] = hit._id
          return log
        })
        context.commit('push_pod_logs', { pod_name: data.pod_name, logs: result })
        context.commit('set_page_number', { pod_name: data.pod_name, page_number: response.data.page_number })
      },
      async request_live_logs (context, data) {
        let link = 'http://localhost:8000' + data.logs_url.replace('{page}', 0)
        const response = await backend.get(link)
        console.log('IN REQUEST LIVE LOGS', response)
        let result = response.data.hits.map(hit => {
          let log = {}
          log['log'] = hit._source.log
          log['stream'] = hit._source.stream
          log['timestamp'] = moment(hit._source['@timestamp']).format('MMMM Do YYYY, h:mm:ss a')
          log['_id'] = hit._id
          return log
        })
        let pod_logs = context.getters['get_pod_logs'][data.pod_name]
        let new_logs = []
        console.log(pod_logs, result)

        const isSameUser = (a, b) => a._id == b._id
        const onlyInLeft = (left, right, compareFunction) => 
          left.filter(leftValue =>
            !right.some(rightValue => 
              compareFunction(leftValue, rightValue)))

        //const onlyInA = onlyInLeft(pod_logs, result, isSameUser)
        new_logs = onlyInLeft(result, pod_logs, isSameUser)

        /*
        if (result.length > pod_logs.length) {

          console.log('INSIDE IF', result, pod_logs)
          for (let i = 0; i < result.length - pod_logs.length; i++) {
            console.log('INDEX', result[result.length - 1 - i], pod_logs[ pod_logs.length - 1 - i], i)
            if (result[result.length - 1 - i]._id !== pod_logs[ pod_logs.length - 1 - i]) {
              new_logs.push(result[i])
            } else {
              break
            }
          }
        } else {
          console.log('OUTSIDE IF', result, pod_logs)
          for (let i = result.length - 1; i > 0; i--) {
            if (result[i]._id !== pod_logs[i + pod_logs.length - result.length]._id) {
              console.log('INDEX', result[i], pod_logs[i+ pod_logs.length - result.length], i, i+ pod_logs.length - result.length)
              new_logs.push(result[i])
            } else {
              break
            }
          }
        }
        */
        console.log('NEW LOGS', new_logs)
        context.commit('append_pod_logs', { pod_name: data.pod_name, logs: new_logs })
      }

    }
  }
}

export default pods_container
