<template>
  <!-- Admin Page To Login through href="/admin" -->
  <div class="hero">
    <h3 class="vue-title">Admin Login</h3>
    <div class="container login-form">
      <form @submit.prevent="submit">
        <div class="form-content align-center">
          <div class="column">
            <div class="form-group">
              <input type="email" class="form-control" placeholder="Email Address" required="" v-model="email" />
            </div>
            <div class="form-group">
              <input type="password" class="form-control" placeholder="Password" required="" v-model="password" />
            </div>
          </div>
          <button class="btnSubmit" type="submit" :disabled="submitStatus === 'PENDING'">Login</button>
        </div>
        <p class="typo__p" v-if="submitStatus === 'OK'">Thank you</p>
        <p class="typo__p" v-if="submitStatus === 'PENDING'">Logging you in...</p>
      </form>

    </div>
  </div>
</template>

<script>
import AuthService from '../../services/AuthService'
import Vue from 'vue'
import VueForm from 'vueform'

Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})

export default {
  data () {
    return {
      email: '',
      password: '',
      error: '',
      submitStatus: null
    }
  },
  methods: {
    // When admin clicks login
    submit () {
      console.log('submit')
      this.submitStatus = 'PENDING'
      setTimeout(() => {
        var credentials = {
          email: this.email,
          password: this.password
        }
        this.credentials = credentials
        this.loginAdmin(this.credentials)
      }, 500)
    },
    // Logs in the Admin
    loginAdmin: function (credentials) {
      console.log('LoginAdmin')
      AuthService.adminLogin(credentials)
        .then(response => {
          this.submitStatus = 'OK'
          console.log(response)
          // Sets token for admin through store.js
          this.$store.dispatch('setAdminToken', response.data.token)
          this.$store.dispatch('setAdmin', response.data.admin)
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
          this.$swal({
            title: `${err.response.data.message}`,
            type: 'error',
            showLoaderOnConfirm: true
          })
        })
    }
  }
}
</script>

<style scoped>
  .vue-title {
    margin-top: 125px;
    text-align: center;
    font-size: 30pt;
    margin-bottom: 10px;
  }
  .form-control {
    border-radius: 1.5rem;
  }
  .btnSubmit {
    border: none;
    border-radius: 1.5rem;
    padding: 1%;
    width: 20%;
    cursor: pointer;
    background: #3AAFA9;
    color: #fff;
  }
</style>
