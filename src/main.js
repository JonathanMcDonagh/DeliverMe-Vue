// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueSweetalert2 from 'vue-sweetalert2'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueRouter from 'vue-router'
import firebase from 'firebase'
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import {config} from './helpers/firebaseConfig'
import store from './store/store'
import firebaseAuth from './firebaseAuth'
import {sync} from 'vuex-router-sync'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VueSweetalert2)

// For store
sync(store, router)
Vue.config.productionTip = false

// Google Maps
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDmDGJjxDvXlxY9K4xzxXLcDWmXEpvJdNE',
    libraries: 'places', // necessary for places input
    google: 'google'
  }
})

/* eslint-disable no-new */
// Firebase login
new Vue({
  router,
  store,
  components: { App },
  beforeCreate () {
    firebaseAuth.initializeFirebaseLogin(this)
  },
  created () {
    firebase.initializeApp(config)
  },
  el: '#app',
  render: h => h(App)
})
