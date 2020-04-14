<template>
  <form @submit.prevent="submit">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 align-center">
      <div class="form-content align-center">

        <!-- Displays job status to the users which they cannot edit -->
        <div class="form-group"  :class="{ 'form-group--error': $v.jobStatus.$error }">
          <label class="form__label">Job Status (i.e. Accepted By Your Name)</label>
          <input class="form__input" v-model.trim="$v.jobStatus.$model"/>
          <div class="error" v-if="!$v.jobStatus.required">This field is Required</div>
        </div>

        <!-- Displays job status to the users which they cannot edit -->
        <div class="form-group"  :class="{ 'form-group--error': $v.jobMessage.$error }">
          <label class="form__label">Job Message (Leave a note for the user) </label>
          <input class="form__input" v-model.trim="$v.jobMessage.$model"/>
          <div class="error" v-if="!$v.jobMessage.required">This field is Required</div>
        </div>

        <!-- Displays job status to the users which they cannot edit -->
        <div class="form-group"  :class="{ 'form-group--error': $v.phoneNum.$error }">
          <label class="form__label">Users Phone Number</label>
          <input class="form__input" disabled v-model.trim="$v.phoneNum.$model"/>
          <div class="error" v-if="!$v.phoneNum.required">This field is Required</div>
        </div>

        <p>
          <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Accept Job</button>
        </p>

      <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your help</p>
      <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
      <p class="typo__p" v-if="submitStatus === 'PENDING'">adding...</p>
    </div>
      </div>
    </div>
  </form>
</template>

<script>
import Vue from 'vue'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

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
      phoneNum: this.job.phoneNum,
      jobStatus: this.job.jobStatus,
      jobMessage: this.job.jobMessage,
      submitStatus: null
    }
  },
  // Form validations
  validations: {
    phoneNum: {
      required
    },
    jobStatus: {
      required
    },
    jobMessage: {
      required
    }
  },
  methods: {
    // Submit Job
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
            phoneNum: this.phoneNum,
            jobStatus: this.jobStatus,
            jobMessage: this.jobMessage
          }
          this.job = job
          console.log('Submitting in JobForm : ' + JSON.stringify(this.job, null, 5))
          this.$emit('job-is-created-updated', this.job)
        }, 500)
      }
    },
    loadDriverDetails () {
      this.fname = this.$store.state.driver.fname
      this.lname = this.$store.state.driver.lname
      this.driverEmail = this.$store.state.driver.email
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
    width: 100%;
    text-align: left;
    font-size: x-large;
  }
  .typo__p {
    width: 100%;
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
  .dirty {
    border-color: #5A5;
    background: #EFE;
  }
  .dirty:focus {
    outline-color: #8E8;
  }
  .error {
    border-color: #3AAFA9;
    background: #3AAFA9;
    color: whitesmoke;
    border-radius: 1.5rem;
  }
  .btn-primary {
    background-color: #3AAFA9;
    border-color: #3AAFA9;
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
