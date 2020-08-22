import Vue from 'vue'
import Vuex from 'vuex'
import * as backend from './api/backend'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    metrics: ['kubernetes', 'api_server', 'cluster_nodes', 'cpu_cores', 'main_memory', 'deployed_pods', 'allocated_volumes', 'portal_users', 'kubeportal'],
    statistics : [],
    webapps: [],
    jwt: '',
    is_authenticated: '',
    deploymentname: '',
    imagename: '',
    containername: '',
    containerport: '',
    targetport: '',
    serviceport: '',
    namespace: '',
    servicename: '',
    ingressname: '',
    domainname: '',
    subdomain: '',
    hostname_valid: '',
    current_generator_tab: 'Deployment'
  },

  getters: {
    get_all_statistics (state) { return state.statistics },
    get_metrics (state) { return state.metrics },
    get_webapps (state) { return state.webapps },
    get_current_user (state) { return state.user },
    get_jwt (state) { return state.jwt },
    get_is_authenticated (state) { return state.is_authenticated }
  },

  mutations: {
    set_user (state, user) { state.user = user },
    update_statistics (state, metric) { state.statistics.push(metric) },
    update_webapps (state, webapps) { state.webapps = webapps },
    update_token (state, token) { state.jwt = token },
    set_is_authenticated (state, status) { state.is_authenticated = status },
    setAppName (state, name) { state.deploymentname = name },
    setTargetPort (state, port) { state.targetport = port },
    setServicePort (state, port) { state.serviceport = port },
    setServiceName (state, name) { state.servicename = name },
    setNamespace (state, namespace) { state.namespace = namespace },
    setIngressName (state, ingressname) { state.ingressname = ingressname },
    setContainerPort (state, port) { state.containerport = port },
    setContainerName (state, name) { state.containername = name },
    setImageName (state, name) { state.imagename = name },
    setDomainName (state, name) { state.domainname = name },
    setSubdomain (state, name) { state.subdomain = name },
    setHostnameValidation (state, valid) { state.validate_hostname = valid },
    set_current_generator_tab (state, tab) { state.current_generator_tab = tab }
  },
  actions: {
    async get_current_user (context, field) {
      const user = await backend.readByField('/users', field, context.state.jwt)
      context.commit('set_user', user)
      return user
    },
    async get_statistic_metric (context, field) {
      const statistics = await backend.readByField('/statistics', field, context.state.jwt)
      context.commit('update_statistics', statistics)
      return statistics
    },
    async get_webapps (context) {
      const webapps = await backend.read('/webapps', context.state.jwt)
      context.commit('update_webapps', webapps)
      return webapps
    },
    async post_login_data (context, request_body) {
      const response = await backend.create('/login', request_body)
      return response
    },
    async authorize_google_user (context, auth_response) {
      const response = await backend.create('/login/authorize_google_user', auth_response)
      return response
    },
    async validate_hostname (context, payload) {
      let request_body = { 'hostname' : payload }
      const validation = await backend.create('/check/ingress', request_body)
      console.log(validation)
      context.commit('setHostnameValidation', validation)
    }
  }
})
