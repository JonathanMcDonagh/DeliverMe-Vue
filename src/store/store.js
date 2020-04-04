import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  // Using plugin to persist the login states after refresh
  plugins: [createPersistedState()],
  // Set state
  state: {
    token: null,
    driver: null,
    admin: null,
    isDriverLoggedIn: false,
    isAdminLoggedIn: false
  },
  // Mutations
  mutations: {
    // Set token for driver
    setDriverToken (state, token) {
      state.token = token
      if (token) {
        state.isDriverLoggedIn = true
      } else {
        state.isDriverLoggedIn = false
      }
    },
    // Set token for admin
    setAdminToken (state, token) {
      state.token = token
      if (token) {
        state.isAdminLoggedIn = true
      } else {
        state.isAdminLoggedIn = false
      }
    },
    // Set admin state
    setAdmin (state, admin) {
      state.admin = admin
    },
    // Set driver state
    setDriver (state, driver) {
      state.driver = driver
    }
  },
  // Actions
  actions: {
    // Set driver token
    setDriverToken ({commit}, token) {
      commit('setDriverToken', token)
    },
    // Set driver
    setDriver ({commit}, driver) {
      commit('setDriver', driver)
    },
    // Set admin token
    setAdminToken ({commit}, token) {
      commit('setAdminToken', token)
    },
    // Set Admin
    setAdmin ({commit}, admin) {
      commit('setAdmin', admin)
    }
  }
})

export default store
