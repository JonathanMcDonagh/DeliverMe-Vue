// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSweetalert2 from 'vue-sweetalert2'
import VueRouter from 'vue-router'
import firebase from 'firebase'
import router from './router'
import {config} from './helpers/firebaseConfig'
import store from './store/store'
import {sync} from 'vuex-router-sync'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(VueSweetalert2)

sync(store, router)

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBVY2P4Ozdla2V4bhwo2CQbuTxTFkufsdE',
    libraries: 'places' // necessary for places input
  }
})

/* eslint-disable no-new */
// Firebase login
new Vue({
  router,
  store,
  components: { App },
  created () {
    firebase.initializeApp(config)
    firebase.auth().onAuthStateChanged((user) => {

    })
  },
  el: '#app',
  render: h => h(App)
})

let app = ''
var firebaseConfig = {
  apiKey: 'AIzaSyDq_lK_lXL51B8A3hW6Qd27hs0-oocvw3E',
  authDomain: 'deliverme-wit.firebaseapp.com',
  databaseURL: 'https://deliverme-wit.firebaseio.com',
  projectId: 'deliverme-wit',
  storageBucket: 'deliverme-wit.appspot.com',
  messagingSenderId: '902093639897',
  appId: '1:902093639897:web:38677aca3788ec88d42ec8',
  measurementId: 'G-06W974H06W'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})

/* eslint-disable no-new */
new Vue({

})
