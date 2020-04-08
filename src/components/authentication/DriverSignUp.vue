<template>
  <div id="app1" class="hero">
    <h3 class="vue-title">Driver Sign Up</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <driver-form :driver="driver" driverBtnTitle="Submit Driver"
                    @driver-is-created-updated="submitDriver"></driver-form>
        </div><!-- /col -->
      </div><!-- /row -->
    </div><!-- /container -->
  </div>
</template>

<script>
import AuthService from '../../services/AuthService'
import Vue from 'vue'
import DriverForm from '../views/DriverForm'
import VueSweetalert from 'vue-sweetalert'
import {Vuelidate} from 'vuelidate'

Vue.use(Vuelidate)
Vue.use(VueSweetalert)

export default {
  data () {
    return {
      driver: {
        fname: '',
        lname: '',
        email: '',
        password: '',
        confirmpassword: '',
        uploadURL: ''
      }
    }
  },
  // Request Job Form
  components: {
    'driver-form': DriverForm
  },
  methods: {
    // To add driver
    submitDriver: function (driver) {
      console.log('submitDriver')

      AuthService.registerDriver(driver)
        .then(response => {
          console.log('submitDriver!')
          console.log('Submitting in submitDriver : ' + JSON.stringify(driver, null, 5))
          console.log(response)
        })
        .catch(err => {
          this.errors.push(err)
          console.log(err)
        })
    },
    // To login driver
    loginDriver: function (driver) {
      const credentials = {
        email: driver.email,
        password: driver.password
      }
      AuthService.login(credentials)
        .then(response => {
          // JSON responses are automatically parsed.
          console.log(response)
          // localStorage.setItem('token', response.data.token)
          this.$store.dispatch('setDriverToken', response.data.token)
          this.$store.dispatch('setDriver', response.data.driver)
          // window.location.reload()
          // this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
  .vue-title {
    margin-top: 100px;
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
    margin-bottom: 10px;
    cursor: pointer;
    background: #3AAFA9;
    color: #fff;
  }
  img.preview {
    width: 200px;
  }
  .signUpLabels {
    text-align: center;
  }
  .error {
    border-color: #3AAFA9;
    background: #3AAFA9;
    color: whitesmoke;
    border-radius: 1.5rem;
    margin-top:0;
  }
</style>
