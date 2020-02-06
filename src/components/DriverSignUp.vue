<template>
  <div id="app1" class="hero">
    <h3 class="vue-title">Driver Registration</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">

          <form @submit.prevent="submit">

            <div v-show="step === 1">
              <div class="form-group" :class="{ 'form-group--error': $v.fname.$error }">
                <label class="form-control-label" name="fname">First Name</label>
                <input class="form__input" type="text" v-model.trim="fname"/>
              </div>
              <div class="error" v-if="!$v.fname.required">First Name is Required</div>

              <div class="form-group" :class="{ 'form-group--error': $v.lname.$error }">
                <label class="form-control-label" name="lname">Last Name</label>
                <input class="form__input" type="text" v-model.trim="lname"/>
              </div>
              <div class="error" v-if="!$v.lname.required">Last Name is Required</div>

              <div class="form-group" :class="{ 'form-group--error': $v.email.$error }">
                <label class="form-control-label" name="email">Email</label>
                <input class="form__input" type="text" v-model.trim="email"/>
              </div>
              <div class="error" v-if="!$v.email.required">Email is Required</div>

              <div class="form-group" :class="{ 'form-group--error': $v.password.$error }">
                <label class="form-control-label" name="password">Password</label>
                <input class="form__input" type="password" v-model.trim="password"/>
              </div>
              <div class="error" v-if="!$v.password.required">Password is Required</div>

              <label class="signUpLabels">Please note we require proof of a Full Drivers Licence and proof Billing Address</label><br>
              <label class="signUpLabels">Click 'Next' below to upload your forms </label><br>
              <button class="navbtn" @click.prevent="next()">Next</button>
            </div>

            <div v-show="step === 2">
              <label class="signUpLabels">Please upload a clear image of your forms</label><br>

              <label class="signUpLabels">Below upload your Full Drivers Licence</label><br>
              <div class="form-group" :class="{ 'form-group--error': $v.fullLicenceUrl.$error }">
                <label class="form-control-label" name="fullLicenceUrl">Full Licence</label>
                <input id="fullLicence" class="form__input" type="file"  @change="onFileChangeFL"/>
                <img v-if="fullLicenceUrl" :src="fullLicenceUrl" />
              </div>
              <div class="error" v-if="!$v.fullLicenceUrl.required">Full Licence is Required</div>

              <label class="signUpLabels">Below upload your Full Drivers Licence</label><br>
              <div class="form-group" :class="{ 'form-group--error': $v.billingAddressUrl.$error }">
                <label class="form-control-label" name="billingAddressUrl">Billing Address</label>
                <input id="billingAddress" class="form__input" type="file"  @change="onFileChangeBA"/>
                <img v-if="billingAddressUrl" :src="billingAddressUrl" />
              </div>
              <div class="error" v-if="!$v.billingAddressUrl.required">Billing Address is Required</div>

              <button class="navbtn" @click.prevent="prev()">Go Back</button><br>

              <p>
                <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Register</button>
              </p>
              <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your help!</p>
              <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
              <p class="typo__p" v-if="submitStatus === 'PENDING'">adding...</p>

            </div>

          </form>
        </div><!-- /col -->
      </div><!-- /row -->
    </div><!-- /container -->
  </div>
</template>

<script>
import Vue from 'vue'
import VueForm from 'vueform'
import { required } from 'vuelidate/lib/validators'
import {Vuelidate} from 'vuelidate'
import VueSweetalert from 'vue-sweetalert'

Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})
Vue.use(Vuelidate)
Vue.use(VueSweetalert)

export default {
  name: 'DriverSignUp',
  data () {
    return {
      step: 1,
      fname: '',
      lname: '',
      email: '',
      fullLicenceUrl: '',
      billingAddressUrl: '',
      password: '',
      submitStatus: null
    }
  },
  validations: {
    fname: {
      required
    },
    lname: {
      required
    },
    email: {
      required
    },
    password: {
      required
    },
    fullLicenceUrl: {
      required
    },
    billingAddressUrl: {
      required
    }
  },
  methods: {
    onFileChangeFL (e) {
      const flFile = e.target.files[0]
      this.fullLicenceUrl = URL.createObjectURL(flFile)
    },
    onFileChangeBA (e) {
      const billingAddressUrl = e.target.files[0]
      this.billingAddressUrl = URL.createObjectURL(billingAddressUrl)
    },
    prev () {
      this.step--
    },
    next () {
      this.step++
    }
  }
}
</script>

<style scoped>

  .vue-title {
    margin-top: 30px;
    text-align: center;
    font-size: 45pt;
    margin-bottom: 10px;
  }
  #app1 {
    width: 95%;
    margin: 0 auto;
  }
  .required-field > label::after {
    content: '*';
    color: red;
    margin-left: 0.25rem;
  }
  .item-form .form-control-label.text-left{
    text-align: left;
  }
  label {
    display: inline-block;
    width: 540px;
    text-align: left;
    font-size: x-large;
  }
  .typo__p {
    width: 540px;
    font-size: x-large;
  }
  .btn1 {
    width: 300px;
    font-size: x-large;
  }
  p {
    margin-top: 20px;
  }
  input {
    border: 1px solid silver;
    border-radius: 4px;
    background: white;
    padding: 5px 10px;
    width: 540px;
  }
  .dirty {
    border-color: #5A5;
    background: #EFE;
  }
  .dirty:focus {
    outline-color: #8E8;
  }
  .error {
    border-color: #28A745;
    background: #28A745;
    color: whitesmoke;
  }
  .btn-primary {
    background-color: #28A745;
    border-color: #28A745;
    color: #fff;
  }
  .btn-primary:hover {
    color: #28A745;
    border: 2px solid #28A745;
    background-color: white;
  }

  .navbtn {
    background-color: #28A745;
    border-color: #28A745;
    color: white;
  }

  .navbtn:hover {
    color: #28A745;
    border: 2px solid #28A745;
    background-color: white;
  }
  .error:focus {
    outline-color: #ffa519;
  }

  button {
    margin-top: 10px;
    width: 10%;
    cursor: pointer;
    margin-bottom: 50px;
  }
  span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
  }

  #fullLicence img, billingAddress img {
    max-width: 100%;
    max-height: 500px;
  }
</style>
