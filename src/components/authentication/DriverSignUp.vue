<template id="userLoginPage">
  <div class="hero">

    <section class="pt-5 pb-5 bg-dark position-relative sectionBG">

      <div class="bg-overlay"></div>
      <div class="container pt-5 pb-5 position-relative">
        <div class="row d-flex justify-content-between pt-lg-5 align-items-center">
          <div class="col-xl-5 col-lg-6 col-md-7 text-center text-lg-left mb-5 mb-lg-0">
            <h1 class="display-3 font-weight-bold text-white aos-init aos-animate loginHeading" data-aos="fade-up" style="">Sign Up</h1>
            <div class="my-4 aos-init" data-aos="fade-up">
              <p class="lead text-white">Sign up today as a driver to start delivering to our users and get paid the delivery fee!</p>
            </div>
          </div>
          <div class="col">
            <div class="row justify-content-center">
              <div class="col-xl-8 col-md-10">
                <div class="row">
                  <div class="col-12">
                    <div class="form-group mb-1">

                      <img src="../../assets/blankprofile.png" style="margin-top: 50px; width: 75px; height: 75px; border-radius: 50%" />
                      <driver-form :driver="driver" driverBtnTitle="Submit Driver"
                                   @driver-is-created-updated="submitDriver"></driver-form>

                    </div>

                  </div>
                  <div class="col">

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
    <Footer></Footer>

  </div>
</template>

<script>
import AuthService from '../../services/AuthService'
import Vue from 'vue'
import DriverForm from '../Forms/DriverForm'
import Footer from '../views/Footer'
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
    'driver-form': DriverForm,
    'Footer': Footer
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
    margin-top: 125px;
    text-align: center;
    font-size: 30pt;
    margin-bottom: 10px;
    color: #3AAFA9;
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
    color: #feffff;
  }
  .error {
    border-color: #3AAFA9;
    background: #3AAFA9;
    color: whitesmoke;
    border-radius: 1.5rem;
    margin-top: 0;
  }
  .sectionBG {
    background-image: url("../../assets/loginBG.jpg");
    min-height:100vh;
    background-size: cover;
  }
  .bg-overlay{
    background: rgba(0,0,0, .7);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right:0;
    z-index: 0;
  }
  #app > div:nth-child(2) > button > a {
    color: #ffffff;
  }
  #app > div:nth-child(2) > button > a:hover {
    color: #3AAFA9;
  }
  .btn-primary {
    background-color: #3AAFA9;
    border-color: #3AAFA9;
    color: #ffffff;
    direction: ltr;
    font-weight: 500;
    height: auto;
    line-height: normal;
    max-width: 220px;
    min-height: 40px;
    padding: 8px 16px;
    text-align: center;
    width: 100%;
  }
  .btn-primary:hover {
    color: #3AAFA9;
    border: 2px solid #3AAFA9;
    background-color: #ffffff;
  }

  @media only screen and (max-width: 375px) {
    .loginHeading {
      margin-top: 125px;
    }
  }
</style>
