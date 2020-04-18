<template>
  <div class="hero">

    <div class="banner-header">
        <div class="banner-header-bg">
          <div class="container">
            <div class="container text-left">
              <h3 class="vue-title" style="color: #feffff">{{messagetitle}}</h3>
              <div class="breadcrumbs_path">
                <a><router-link style="color: #feffff" to="/">Home</router-link></a> > {{messagetitle}}
              </div>
            </div>
        </div>
      </div>
    </div>

    <div id="app1">
    <hr>
    <img :src="photo" style='height: 120px'> <br>
    <p>Name: {{name}}</p>
    <p>Email: {{email}}</p>
    <p>UserId: {{userId}}</p>
    <hr>
  </div>
    <Banner></Banner>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../views/Footer'
import Banner from '../views/Banner'

import firebase from 'firebase'
export default {
  data () {
    return {
      messagetitle: ' My Account ',
      photo: '',
      userId: '',
      name: '',
      email: '',
      user: {}
    }
  },
  // Request Job Form
  components: {
    'Banner': Banner,
    'Footer': Footer
  },
  created () {
    var loggedUser = this
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        loggedUser.user = user
        loggedUser.name = loggedUser.user.displayName
        loggedUser.email = loggedUser.user.email
        loggedUser.photo = loggedUser.user.photoURL
        loggedUser.userId = loggedUser.user.uid
      }
    })
  }
}
</script>

<style>
  .vue-title {
    margin-top: 125px;
    text-align: center;
    font-size: 30pt;
    margin-bottom: 10px;
    color: #3AAFA9;
  }
</style>
