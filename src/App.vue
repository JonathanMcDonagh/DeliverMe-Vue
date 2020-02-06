<template>
  <div id="app">
    <b-navbar toggleable="md" id="navbg" variant="success" type="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/" class="heading">DeliverMe</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/jobs">Manage Delivery</b-nav-item>
          <b-nav-item to="/job">Request Delivery</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" right>
          <b-nav-item v-if="photo"><img :src="photo" style="width: 25px; height: 25px; border-radius: 50%"></b-nav-item>
          <b-nav-item to="/login" v-else>Login</b-nav-item>
          <b-nav-item @click="logOut" v-if="user">Log Out</b-nav-item>
          <b-nav-item to="/RegisterAsDriver" v-else>Register</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
import Toasted from 'vue-toasted'
import Vue from 'vue'
import firebase from 'firebase'

// eslint-disable-next-line no-undef
Vue.use(Toasted)

export default {
  name: 'App',
  data () {
    return {
      photo: '',
      name: '',
      email: '',
      password: ''
    }
  },
  created () {
    var loggedUser = this
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        loggedUser.user = user
        loggedUser.name = loggedUser.user.displayName
        loggedUser.photo = loggedUser.user.photoURL
        loggedUser.userId = loggedUser.user.uid
      }
    })
    this.user = firebase.auth().currentUser || false
  },
  methods: {
    logOut () {
      firebase.auth().signOut()
        .then(
          Vue.toasted.show('You are logged out').goAway(5000)
        )
    }
  }
}
</script>

<style>
  #app {
    font-family:helvetica neue,Helvetica,Roboto,Arial,sans-serif;
    font-size:1rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

</style>
