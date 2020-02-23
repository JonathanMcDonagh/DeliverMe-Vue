<!--suppress CssUnknownTarget -->
<template>
  <div id="app">
    <b-navbar toggleable="md" id="navbg" variant="info" type="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">
        <img src="https://placekitten.com/g/30/30" class="d-inline-block align-top" alt="Kitten">
        DeliverMe
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/jobs">All Deliveries</b-nav-item>
          <b-nav-item to="/managejobs">My Deliveries</b-nav-item>
          <b-nav-item to="/job">Request Delivery</b-nav-item>
        </b-navbar-nav>

        <!-- user nav -->
        <b-navbar-nav class="ml-auto" right v-if="user">
          <b-nav-item v-show="photo"><img :src="photo" style="width: 25px; height: 25px; border-radius: 50%"></b-nav-item>
          <b-nav-item v-if="user">{{name}}</b-nav-item>
          <b-nav-item @click="logOut" v-if="user">Log Out</b-nav-item>
        </b-navbar-nav>

        <!-- user and driver signed out nav -->
        <b-navbar-nav class="ml-auto" right v-else>
          <b-nav-item to="/login">Login</b-nav-item>
          <b-nav-item to="/RegisterAsDriver">Register As Driver</b-nav-item>
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
        loggedUser.email = loggedUser.user.email
        loggedUser.name = loggedUser.user.displayName
        loggedUser.photo = loggedUser.user.photoURL
        loggedUser.userId = loggedUser.user.uid
      }
    })
    this.user = firebase.auth().currentUser || false

    var loggedDriver = this
    firebase.auth().onAuthStateChanged(function (driver) {
      if (driver) {
        loggedDriver.driver = driver
        loggedDriver.email = loggedUser.driver.email
        loggedDriver.driverId = loggedUser.driver.uid
      }
    })
    this.driver = firebase.auth().currentUser || false
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

  body {
    background-size: cover;
    background-repeat: no-repeat;
    bottom: 0;
    right: 0;
    margin:0;
    padding:0;
  }
  #app {
    font-family:helvetica neue,Helvetica,Roboto,Arial,sans-serif;
    font-size:1rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

</style>
