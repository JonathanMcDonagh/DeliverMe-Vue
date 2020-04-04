import Vue from 'vue'
import Vuex from 'vuex'
import firebaseAuth from '../firebaseAuth'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  // Using plugin to persist the login states after refresh
  plugins: [createPersistedState()],
  state: {
    token: null,
    driver: null,
    user: null,
    admin: null,
    isDriverLoggedIn: false,
    isAdminLoggedIn: false,
    isUserLoggedIn: false
  },
  getters: {
    user: state => state.user,
    isLogged: state => (state.user !== null)
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
    setUserToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setAdmin (state, admin) {
      state.admin = admin
    },
    setDriver (state, driver) {
      state.driver = driver
    },
    setUser (state, user) {
      state.user = user
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
    },
    setUserToken ({commit}, token) {
      commit('setUserToken', token)
    },
    setCurrentUser ({commit}) {
      commit('setUser', firebaseAuth.user())
    }
  }
})

export default store
