import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  // Using plugin to persist the login states after refresh
  plugins: [createPersistedState()],
  state: {
    token: null,
    driver: null,
    isDriverLoggedIn: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isDriverLoggedIn = true
      } else {
        state.isDriverLoggedIn = false
      }
    },
    setAdminToken (state, token) {
      state.token = token
      if (token) {
        state.isAdminLoggedIn = true
      } else {
        state.isAdminLoggedIn = false
      }
    },
    setAdmin (state, admin) {
      state.admin = admin
    },
    setDriver (state, driver) {
      state.driver = driver
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setDriver ({commit}, driver) {
      commit('setDriver', driver)
    },
    setAdminToken ({commit}, token) {
      commit('setAdminToken', token)
    },
    setAdmin ({commit}, admin) {
      commit('setAdmin', admin)
    }
  }
})

export default store
