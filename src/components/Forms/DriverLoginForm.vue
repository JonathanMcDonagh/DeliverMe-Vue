<template>
  <form @submit.prevent="submit">
      <div class="col-lg-12 col-md-12 col-sm-12 align-center">
        <div class="form-content align-center">
          <div class="form-group">
            <input type="email" class="form-control" placeholder="Email Address*" required="" v-model="email" />
          </div>
          <div class="form-group">
            <input type="password" class="form-control" placeholder="Password*" required="" v-model="password" />
          </div>
            <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Login</button>
        </div>
        <p class="typo__p" v-if="submitStatus === 'OK'">Thank you</p>
        <p class="typo__p" v-if="submitStatus === 'PENDING'">Logging</p>
        <button class="btn btn-primary btn1" style="margin-top: 3.5%" @click="goBack">Go Back</button>
      </div>
  </form>
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
      messagetitle: 'Login',
      email: this.driver.email,
      password: this.driver.password,
      error: '',
      submitStatus: null
    }
  },
  methods: {
    // For driver login
    submit () {
      console.log('submit')
      this.submitStatus = 'PENDING'
      setTimeout(() => {
        var credentials = {
          email: this.email,
          password: this.password
        }
        this.credentials = credentials
        this.loginDriver(this.credentials)
      }, 500)
    },
    // Go back to the login page
    goBack: function () {
      this.$router.push('login')
    },
    // Login driver method
    loginDriver: function (credentials) {
      console.log('LoginDriver')
      AuthService.driverLogin(credentials)
        .then(response => {
          this.submitStatus = 'OK'
          console.log(response)
          this.$store.dispatch('setDriverToken', response.data.token)
          this.$store.dispatch('setDriver', response.data.driver)
          this.$router.push('/')
        })
        .catch(err => {
          window.location.reload()
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
  .form-control {
    border-radius: 1.5rem;
  }
  .btnSubmit {
    border-radius: 1.5rem;
    border: 2px solid #3AAFA9;
    padding: 1%;
    width: 20%;
    cursor: pointer;
    color: #fff;
    background: #3AAFA9;
  }
  .btnSubmit:hover {
    border-radius: 1.5rem;
    border: 2px solid #3AAFA9;
    padding: 1%;
    width: 20%;
    background-color: #ffffff;
    color: #3AAFA9;
    cursor: pointer;
  }
  .form-control {
    border-radius: 1.5rem;
  }

  .btn-primary {
    background-color: #3AAFA9;
    border-radius: 1.5rem;
    border: 2px solid #3AAFA9;
  }
  .btn-primary:hover {
    color: #3AAFA9;
    border: 2px solid #3AAFA9;
    background-color: white;
    border-radius: 1.5rem;
  }
</style>
