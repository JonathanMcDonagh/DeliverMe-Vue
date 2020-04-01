<!--suppress CssUnknownTarget -->
<template>
  <div id="app">

    <b-navbar toggleable="md" id="navbg" class="navbar fixed-top navbar navbar-expand-lg navbar-light bg-light">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="/">
        <img src="https://firebasestorage.googleapis.com/v0/b/deliverme-wit.appspot.com/o/DeliverMeLogo.png?alt=media&token=ca97d768-3902-41e1-9d99-510ab48679a9" height="50" class="d-inline-block align-top" alt="logo">
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav v-if="user || $store.state.isDriverLoggedIn || $store.state.isAdminLoggedIn">
          <b-nav-item v-if="user || $store.state.isDriverLoggedIn" to="/">Home</b-nav-item>
          <b-nav-item v-if="$store.state.isDriverLoggedIn" to="/jobs">All Deliveries</b-nav-item>
          <b-nav-item v-if="user" to="/myjobs">My Deliveries</b-nav-item>
          <b-nav-item v-if="user" to="/job">Request Delivery</b-nav-item>
          <b-nav-item v-if="user" to="/map">Map</b-nav-item>

          <b-nav-item v-if="$store.state.isAdminLoggedIn" to="/jobs">All Deliveries List</b-nav-item>
          <b-nav-item v-if="$store.state.isAdminLoggedIn" to="/managejobs">Manage Deliveries List</b-nav-item>
          <b-nav-item v-if="$store.state.isAdminLoggedIn" to="/managedrivers">Manage Drivers List</b-nav-item>
        </b-navbar-nav>

        <!-- user nav -->
        <b-navbar-nav class="ml-auto" right v-if="user || $store.state.isDriverLoggedIn || $store.state.isAdminLoggedIn">
          <b-nav-item v-show="photo"><img :src="photo" style="width: 25px; height: 25px; border-radius: 50%"></b-nav-item>
          <b-nav-item>Welcome {{name || fname || adminEmail }}</b-nav-item>
          <b-nav-item v-if="user || $store.state.isDriverLoggedIn || $store.state.isAdminLoggedIn" @click="logOut">Log Out</b-nav-item>
        </b-navbar-nav>

        <!-- user, driver and admin signed out nav -->
        <b-navbar-nav class="ml-auto" right v-else>
          <b-nav-item to="/login">Login</b-nav-item>
          <b-nav-item to="/RegisterAsDriver">Register As Driver</b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    <router-view/>
    <sitefooter></sitefooter>
  </div>
</template>

<script>
import Toasted from 'vue-toasted'
import Vue from 'vue'
import firebase from 'firebase'
import AuthService from './services/AuthService'
import Footer from './components/views/Footer.vue'

// eslint-disable-next-line no-undef
Vue.use(Toasted)
export default {
  name: 'App',
  data () {
    return {
      photo: '',
      fname: '',
      lname: '',
      name: '',
      email: '',
      driverEmail: '',
      adminEmail: ''
    }
  },
  components: {
    'sitefooter': Footer
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

    this.loadDriverDetails()
    this.loadAdminDetails()
    this.getDriver()
  },
  methods: {
    logOut () {
      firebase.auth().signOut().then(() => {
        this.user = null
        Vue.toasted.show('You are logged out').goAway(5000)
        // eslint-disable-next-line handle-callback-err,no-undef
      }).catch(err => console.log(error))
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setDriver', null)
      this.$store.dispatch('setAdminToken', null)
      this.$store.dispatch('setAdmin', null)
      window.location.reload()
      this.$router.push('/')
    },
    getDriver: function () {
      AuthService.getOneDriver(this.$router.params)
        .then(response => {
          this.temp = response.data
          this.driver = this.temp[0]
          this.childDataLoaded = true
          this.fname = this.driver.fname
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    loadDriverDetails () {
      this.fname = this.$store.state.driver.fname
      this.lname = this.$store.state.driver.lname
      this.driverEmail = this.$store.state.driver.email
    },
    loadAdminDetails () {
      this.adminEmail = this.$store.state.driver.email
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
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: red;
    color: white;
    text-align: center;
  }

  .VueTables__child-row-toggler--closed::before {
    content: "View Phone Number +";
  }
  .VueTables__child-row-toggler--open::before {
    content: "Hide Phone Number -";
  }
</style>
