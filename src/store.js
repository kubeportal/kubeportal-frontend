import Vue from 'vue'
import Vuex from 'vuex'
import wizard from './api/wizard.js'
import infos from './api/infos.js'
import users from './api/users.js'
import api from './api/api.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    users: users.module,
    infos: infos.module,
    wizard: wizard.module,
    api: api.module
  }
})
