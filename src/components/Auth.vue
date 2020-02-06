<template>
  <div>
    <h1>Sign In</h1>

    <div id="firebaseui-auth-container"></div>

    <div>
      <p>
        <router-link class="btn btn-primary btn1" to="/driverlogin">Login as a driver
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import * as firebaseui from 'firebaseui'

export default {
  name: 'auth',

  mounted () {
    var uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ]
    }
    var ui = new firebaseui.auth.AuthUI(firebase.auth())
    ui.start('#firebaseui-auth-container', uiConfig)
  }
}
</script>

<style>
  .firebaseui-idp-icon {
    width: 25px;
    height: 25px;
  }
</style>
