import Vue from 'vue'
import * as backend from '@/api/backend'

const statistics = {
  module: {
    namespaced: true,

    state: {
      metrics: ['kubernetes', 'api_server', 'cluster_nodes', 'cpu_cores', 'main_memory', 'deployed_pods', 'allocated_volumes', 'portal_users', 'kubeportal'],
      statistics : [],
      webapps: []
    },

    getters: {
      get_all_statistics (state) { return state.statistics },
      get_metrics (state) { return state.metrics },
      get_webapps (state) { return state.webapps }
    },

    mutations: {
      update_statistics (state, metric) { state.statistics.push(metric) },
      update_webapps (state, webapps) { state.webapps = webapps },
    },

    actions: {
      async get_statistic_metric (context, field) {
        const statistics = await backend.readByField('/statistics', field, context.state.jwt)
        context.commit('update_statistics', statistics)
        return statistics
      },
      async get_webapps (context) {
        const webapps = await backend.read('/webapps', context.state.jwt)
        context.commit('update_webapps', webapps)
        return webapps
      }
    }
  }
}

export default statistics
