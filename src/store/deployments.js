import * as backend from '@/utils/backend'
import moment from 'moment'
const deployments_container = {
  module: {
    namespaced: true,
    state: {
      deployment_links: {},
      deployments: []
    },

    getters: {
      get_deployment_links (state) { return state.deployment_links },
      get_deployments (state) { return state.deployments }
    },

    mutations: {
      set_deployment_links (state, deployment_links) { state.deployment_links = deployment_links },
      set_deployments (state, deployments) { state.deployments = deployments },
      push_deployment (state, deployment) { state.deployments.push(deployment) }
    },

    actions: {
      async request_deployments (context) {
        const deployment_links = context.getters['get_deployment_links']
        deployment_links.forEach(link => {
          backend.get(link).then(response => {
            console.log('DEPLOYMENTS', response)
            let deployment = response.data
            let data = {}
            data['name'] = deployment.name
            data['creation_timestamp'] = moment(
              deployment.creation_timestamp
            ).format()
            data['replicas'] = deployment.replicas
            context.commit('push_deployment', data)
          })
        })
      }
    }
  }
}

export default deployments_container
