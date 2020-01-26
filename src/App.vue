<template>
  <div id="app">
    <b-navbar toggleable="md" id="navbg" variant="dark" type="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/" class="heading">DeliverMe</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/jobs">Manage Lost Items</b-nav-item>
          <b-nav-item to="/job"> Report Lost Item</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" right>
            <b-nav-item to="/login">Login</b-nav-item>
            <b-nav-item to="/signup">Sign Up</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
import Toasted from 'vue-toasted'
import Vue from 'vue'

// eslint-disable-next-line no-undef
Vue.use(Toasted)

export default {
  name: 'App',
  data () {
    return {
      email: '',
      password: '' }
  },
  methods: {
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
