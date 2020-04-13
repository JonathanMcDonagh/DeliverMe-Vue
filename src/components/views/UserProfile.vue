<template>
  <div class="hero">
    <h3 class="vue-title">My Account Details</h3>
    <hr>
    <img :src="photo" style='height: 120px'> <br>
    <p>Name: {{name}}</p>
    <p>Email: {{email}}</p>
    <p>UserId: {{userId}}</p>
    <hr>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  data () {
    return {
      photo: '',
      userId: '',
      name: '',
      email: '',
      user: {}
    }
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
