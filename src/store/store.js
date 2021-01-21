import Vue from 'vue'
import Vuex from 'vuex'
import wizard from './wizard.js'
import infos from './infos.js'
import users from './users.js'
import api from './api.js'

Vue.use(Vuex)

const store = new Vuex.Store({
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

export default store
