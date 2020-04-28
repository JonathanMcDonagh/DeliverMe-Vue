<template>
  <form @submit.prevent="submit">
    <div class="col-lg-12 col-md-12 col-sm-12 align-center">

      <div class="form-content align-center">
        <!-- Displays job status to the users which they cannot edit -->
        <div class="form-group"  :class="{ 'form-group--error': $v.jobStatus.$error }">
          <label class="form__label">Accepted By</label>
          <input class="form__input" style="background-color: #def2f1" disabled v-model.trim="$v.jobStatus.$model"/>
          <div class="error" v-if="!$v.jobStatus.required">This field is Required</div>
        </div>

        <!-- Displays job status to the users which they cannot edit -->
        <div class="form-group"  :class="{ 'form-group--error': $v.jobMessage.$error }">
          <label class="form__label">Job Message</label>
          <input class="form__input" style="background-color: #def2f1" disabled v-model.trim="$v.jobMessage.$model"/>
          <div class="error" v-if="!$v.jobMessage.required">This field is Required</div>
        </div>

        <!-- Displays job status to the users which they cannot edit -->
        <div class="form-group"  :class="{ 'form-group--error': $v.phoneNum.$error }">
          <label class="form__label">Users Phone Number</label>
          <input class="form__input" style="background-color: #def2f1" disabled v-model.trim="$v.phoneNum.$model"/>
          <div class="error" v-if="!$v.phoneNum.required">This field is Required</div>
        </div>

        <div v-if="user">
          <div v-if="!paidFor">
            <h1>Pay Delivery Fee - €{{ delivery.price }}</h1>
            <p>{{ delivery.description }}</p>
          </div>

          <div v-if="paidFor">
            <h1>Thank you, payment made successfully!</h1>
          </div>
          <div ref="paypal"></div>
        </div>

        <p>
          <button v-if="$store.state.isDriverLoggedIn" class="btn btn-primary btn1" @click="driverJobs">Go Back</button>
          <button v-else-if="$store.state.isAdminLoggedIn" class="btn btn-primary btn1" @click="adminJobs">Go Back</button>
          <button v-else class="btn btn-primary btn1" @click="userJobs">Go Back</button>

        </p>

        <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your help</p>
        <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
        <p class="typo__p" v-if="submitStatus === 'PENDING'">adding...</p>
      </div>

    </div>
  </form>
</template>

<script>
import Vue from 'vue'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import firebase from 'firebase'

Vue.use(VueForm, {
  inputClasses: {
    valid: 'form-control-success',
    invalid: 'form-control-danger'
  }
})

Vue.use(Vuelidate)
export default {
  name: 'FormData',
  props: ['jobBtnTitle', 'job'],
  data () {
    return {
      fname: '',
      lname: '',
      jobStatus: this.job.jobStatus,
      jobMessage: this.job.jobMessage,
      phoneNum: this.job.phoneNum,
      loaded: false,
      paidFor: false,
      delivery: {
        price: this.job.deliveryFee + 0.50,
        description: 'Delivery Fee' + '(€' + this.job.deliveryFee + ')' + ' Serivce Charge (€0.50)'
      },
      submitStatus: null
    }
  },
  // Form validations
  validations: {
    jobStatus: {
      required
    },
    jobMessage: {
      required
    },
    phoneNum: {
      required
    }
  },
  // Gets user information
  created () {
    var loggedUser = this
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        loggedUser.user = user
        loggedUser.name = loggedUser.user.displayName
        loggedUser.email = loggedUser.user.email
        loggedUser.photo = loggedUser.user.photoURL
        loggedUser.userId = loggedUser.user.uid
        loggedUser.platform = loggedUser.user.providerId
      }
    })
    this.user = firebase.auth().currentUser || false
  },
  mounted: function () {
    const script = document.createElement('script')
    script.src =
            'https://www.paypal.com/sdk/js?client-id=AXRLrnrAEwQjJRsaarv13yes0IAHizJLG8Vveg80QOARMJTLTx_Iivti-zQEAXWLN85c_VKL5AEzn9t8&currency=EUR'
    script.addEventListener('load', this.setLoaded)
    document.body.appendChild(script)
  },
  methods: {
    // Method for submitting
    submit () {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
          var job = {
            jobStatus: this.jobStatus,
            jobMessage: this.jobMessage
          }
          this.job = job
          console.log('Submitting in JobForm : ' + JSON.stringify(this.job, null, 5))
          this.$emit('job-is-created-updated', this.job)
        }, 500)
      }
    },
    // To redirect user to their jobs
    userJobs: function () {
      this.$router.push('myjobs')
    },
    driverJobs: function () {
      this.$router.push('driverjobs')
    },
    adminJobs: function () {
      this.$router.push('managejobs')
    },
    loadDriverDetails () {
      this.fname = this.$store.state.driver.fname
      this.lname = this.$store.state.driver.lname
      this.driverEmail = this.$store.state.driver.email
    },
    setLoaded: function () {
      this.loaded = true
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: this.delivery.description,
                  amount: {
                    value: this.delivery.price
                  }
                }
              ]
            })
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture()
            // eslint-disable-next-line no-unused-expressions
            this.data
            this.paidFor = true
            console.log(order)
          },
          onError: err => {
            console.log(err)
          }
        })
        .render(this.$refs.paypal)
    }
  }
}
</script>

<style scoped>
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
    width: 100%;
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
    width: 100%;
  }
  .error {
    border-color: #3AAFA9;
    background: #3AAFA9;
    color: whitesmoke;
    border-radius: 1.5rem;
  }
  .btn-primary {
    background-color: #3AAFA9;
    border: 2px solid #3AAFA9;
    border-radius: 1.5rem;
  }
  .btn-primary:hover {
    color: #3AAFA9;
    border: 2px solid #3AAFA9;
    background-color: white;
    border-radius: 1.5rem;
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
  input.form__input {
    border-radius: 30px;
  }
  input.form__input {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
  .formImage {
    width: 100px;
    height: 100px;
    border: 1px solid white;
    border-radius: 50%
  }
</style>
