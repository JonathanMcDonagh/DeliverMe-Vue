<template id="userLoginPage">
  <div class="hero">

    <!-- Background Image -->
    <section class="pt-5 pb-5 bg-dark position-relative sectionBG">
      <div class="bg-overlay"></div>
      <div class="container pt-5 pb-5 position-relative">
        <div class="row d-flex justify-content-between pt-lg-5 align-items-center">
          <div class="col-xl-5 col-lg-6 col-md-7 text-center text-lg-left mb-5 mb-lg-0">
            <h1 class="display-3 font-weight-bold text-white aos-init aos-animate loginHeading" data-aos="fade-up" style="">Driver Login</h1>
            <div class="my-4 aos-init" data-aos="fade-up">
              <p class="lead text-white">Login as a driver to start delivering to our users and get paid the delivery fee!</p>
            </div>
          </div>

          <div class="col">
            <div class="row justify-content-center">
              <div class="col-xl-8 col-md-10">
                <div class="row">
                  <div class="col-12">
                    <div class="form-group mb-1">

                      <img src="../../assets/blankprofile.png" style="margin-top: 50px; width: 75px; height: 75px; border-radius: 50%" />
                      <!-- Driver Login Form -->
                      <driver-login-form style="margin-top: 20px" :driver="driver" driverBtnTitle="Login"
                                         @driver-is-created-updated="submitDriver"></driver-login-form>

                    </div>
                  </div>

                  <div class="col"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Loads Footer -->
    <Footer></Footer>

  </div>
</template>

<script>
import AuthService from '../../services/AuthService'
import Vue from 'vue'
import VueForm from 'vueform'
import DriverLoginForm from '../Forms/DriverLoginForm'
import Footer from '../views/Footer'
import BannerDriver from '../views/BannerDriver'

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
      email: '',
      password: '',
      error: '',
      submitStatus: null
    }
  },
  // Gets Components
  components: {
    'driver-login-form': DriverLoginForm,
    'BannerDriver': BannerDriver,
    'Footer': Footer
  },
  methods: {
    // When driver clicks login
    submitDriver: function (driver) {
      AuthService.driverLogin(driver)
        .then(response => {
          console.log('submitDriver!')
          console.log('Submitting in submitDriver : ' + JSON.stringify(driver, null, 5))
          console.log(response)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>

  @media only screen and (max-width: 375px) {
    .loginHeading {
      margin-top: 125px;
    }
  }
</style>
