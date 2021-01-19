import Vue from 'vue'
import * as backend from '@/utils/backend'

const infos = {
  module: {
    namespaced: true,
    state: {
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
      cluster_info: [],
      infos: [
        { portal_user_count: '' }
      ]
    },

    getters: {
      get_cluster_request_info (state) {
        return state.cluster_request_info
      },
      get_cluster_info (state) {
        return state.cluster_info
      },
      get_infos (state) {
        return state.infos
      }
    },

    mutations: {
      update_cluster_info (state, info) {
        state.cluster_info.push(info)
      },
      set_cluster_info (state, info) {
        state.cluster_info = info
      },
      push_cluster_info (state, info) {
        state.cluster_info.push(info)
      },
      set_info (state, name, info) {
        state.infos[name] = info
      }
    },

    actions: {
      async request_cluster_infos (context, infos) {
        // const request_info = context.getters['get_cluster_request_info']
        // const cluster_info = context.getters['get_cluster_info']
        // console.log(request_info)

        // // let arr = request_info.filter(element => cluster_info.includes())
        // let arr = cluster_info.filter(element => {
        //   return Object.keys(element)[0]
        // })
        // console.log(arr)
        // for (const name of arr) {
        //   backend.read(`/cluster/${name}/`).then(response => {
        //     console.log('abc', response.data)
        //     context.commit('push_cluster_info', response.data)
        //   })
        // }
        // let index = tmp.findIndex( element => {
        //   if (element.keys()[0] == name)
        // });
        // if (tmp[name] === '') {
        // console.log(tmp[name])
        // backend.read(`/cluster/${name}/`).then(response => {
        //   console.log('abc',response.data)
        //   context.commit('set_info', name, response.data[name])
        // })
        // }
        // const newClusterInfo = []
        for (const field of infos) {
          backend.read(`/cluster/${field}/`).then(response => {
            context.commit('push_cluster_info', response.data)
          })
        //console.log(info)
        //newClusterInfo.push(info.data)
        }
        //context.commit('set_cluster_info', newClusterInfo)
      }
    }
  }
}

export default infos
