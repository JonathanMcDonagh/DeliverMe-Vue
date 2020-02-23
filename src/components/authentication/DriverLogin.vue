<template>
  <div class="login">
    <h2 class="vue-title">Login</h2>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <button @click="login" class="loginBtn">Log in</button><br>
    <span class="backText">Not registered as a driver? Click <router-link to="/RegisterAsDriver">Here</router-link> to register.</span>
  </div>
</template>

<script>
import firebase from 'firebase'
import Toasted from 'vue-toasted'
import Vue from 'vue'
// eslint-disable-next-line no-undef
Vue.use(Toasted)
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('/#/')
          // eslint-disable-next-line no-undef
          Vue.toasted.show('You have successfully logged in using the email: ' + this.email).goAway(5000)
        },
        (err) => {
          alert('Oops. ' + err.message)
        }
      )
    }
  }
}
</script>

<style scoped>  /* "scoped" attribute limit the CSS to this component only */
.vue-title {
  margin-top: 30px;
  text-align: center;
  font-size: 45pt;
  margin-bottom: 10px;
}
.login {
  margin-top: 40px;
}
.backText {
  font-size: 15pt;
}
.loginBtn {
  background-color: #3AAFA9;
  border-color: #3AAFA9;
  color: white;
}
.loginBtn:hover {
  color: #3AAFA9;
  border: 2px solid #3AAFA9;
  background-color: white;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
button {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
}
p {
  margin-top: 40px;
  font-size: 13px;
}
p a {
  text-decoration: underline;
  cursor: pointer;
}
span {
  display: block;
  margin-top: 20px;
  font-size: 11px;
}
</style>
