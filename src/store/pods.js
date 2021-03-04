const pods = {
  module: {
    namespaced: true,
    state: {
      details: {}
    },

    getters: {
      get_details (state) { return state.details }
    },

    mutations: {
      set_details (state, details) { state.details = details }
    },

    actions: {
    }
  }
}

export default pods
