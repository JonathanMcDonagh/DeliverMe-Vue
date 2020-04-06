<template>
  <form @submit.prevent="submit">

      <div class="form-content align-center">

        <!-- Displays users image above the form -->
        <div class="form-group">
          <img v-if="profilephoto" :src="profilephoto" class="formImage" />
          <img v-else class="formImage" src="../../assets/blankprofile.png" />
        </div>

        <!-- Displays users name which they cannot edit -->
        <div class="form-group"  :class="{ 'form-group--error': $v.name.$error }">
          <label class="form__label">Name</label>
          <input class="form__input" disabled v-model.trim="$v.name.$model"/>
          <div class="error" v-if="!$v.name.required">This field is Required</div>
          <div class="error" v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}} letters.</div>
        </div>

        <div class="form-group" :class="{ 'form-group--error': $v.deliveryRequest.$error }">
          <label class="form__label">What do you need delivered?</label>
          <input class="form__input" v-model.trim="$v.deliveryRequest.$model"/>
          <div class="error" v-if="!$v.deliveryRequest.required">This field is Required</div>
          <div class="error" v-if="!$v.deliveryRequest.minLength">Field must have at least {{$v.deliveryRequest.$params.minLength.min}} letters.</div>
        </div>

        <div class="form-group" :class="{ 'form-group--error': $v.place.$error }">
          <label class="form__label">Place</label>
          <input class="form__input" v-model.trim="$v.place.$model"/>
          <div class="error" v-if="!$v.place.required">This field is Required</div>
          <div class="error" v-if="!$v.place.minLength">Description must have at least {{$v.place.$params.minLength.min}} letters.</div>
        </div>

        <div class="form-group" :class="{ 'form-group--error': $v.deliveryFee.$error }">
          <label class="form__label">How much are you willing to pay for delivery? (€)</label>
          <input class="form__input" type="number" v-model.trim="$v.deliveryFee.$model"/>
          <div class="error" v-if="!$v.deliveryFee.required">This field is Required</div>
          <div class="error" v-if="!$v.deliveryFee.minLength">Field must have at least {{$v.deliveryFee.$params.minLength.min}} letters.</div>
          <div class="error" v-if="!$v.deliveryFee.maxLength">Field must only have {{$v.deliveryFee.$params.maxLength.max}} letters.</div>
        </div>

        <div class="form-group" :class="{ 'form-group--error': $v.dropOffLocation.$error }">
          <label class="form__label">Drop Off Location</label>
          <input class="form__input" v-model.trim="$v.dropOffLocation.$model"/>
          <div class="error" v-if="!$v.dropOffLocation.required">This field is Required</div>
          <div class="error" v-if="!$v.dropOffLocation.minLength">Field must have at least {{$v.dropOffLocation.$params.minLength.min}} letters.</div>
        </div>

        <div class="form-group" :class="{ 'form-group--error': $v.dropOffTime.$error }">
          <label class="form__label">Drop Off Time</label>
          <input class="form__input" v-model.trim="$v.dropOffTime.$model"/>
          <div class="error" v-if="!$v.dropOffTime.required">This field is Required</div>
          <div class="error" v-if="!$v.dropOffTime.minLength">Field must have at least {{$v.dropOffTime.$params.minLength.min}} letters.</div>
        </div>

        <div class="form-group" :class="{ 'form-group--error': $v.phoneNum.$error }">
          <label class="form__label">Phone Number</label>
          <input class="form__input" type="number" v-model.trim="$v.phoneNum.$model"/>
          <div class="error" v-if="!$v.phoneNum.required">This field is Required</div>
          <div class="error" v-if="!$v.phoneNum.minLength">Field must have at least {{$v.phoneNum.$params.minLength.min}} numbers.</div>
        </div>

        <!-- Displays job status which the user cannot edit -->
        <!--
        <div class="form-group"  :class="{ 'form-group--error': $v.jobStatus.$error }">
          <label class="form__label">Job Status</label>
          <input class="form__input" disabled v-model.trim="$v.jobStatus.$model"/>
          <div class="error" v-if="!$v.jobStatus.required">This field is Required</div>
        </div>
        -->

         <!-- Displays job message which they cannot edit -->
        <!--
        <div class="form-group"  :class="{ 'form-group--error': $v.jobMessage.$error }">
          <label class="form__label">Job Message</label>
          <input class="form__input" disabled v-model.trim="$v.jobMessage.$model"/>
          <div class="error" v-if="!$v.jobMessage.required">This field is Required</div>
        </div>
        -->

        <p>
          <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Place Job (Cash)</button>
        </p>

      <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your request someone will be in contact with you shortly</p>
      <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
      <p class="typo__p" v-if="submitStatus === 'PENDING'">adding...</p>
    </div>
  </form>
</template>

<script>
import Vue from 'vue'
import VueForm from 'vueform'
import Vuelidate from 'vuelidate'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
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
      messagetitle: ' Job ',
      name: this.job.name,
      deliveryRequest: this.job.deliveryRequest,
      place: this.job.place,
      deliveryFee: this.job.deliveryFee,
      dropOffLocation: this.job.dropOffLocation,
      dropOffTime: this.job.dropOffTime,
      phoneNum: this.job.phoneNum,
      usertoken: firebase.auth().currentUser.uid,
      profilephoto: firebase.auth().currentUser.photoURL,
      jobStatus: this.job.jobStatus,
      jobMessage: this.job.jobMessage,
      submitStatus: null
    }
  },
  // Gets user information from Firebase
  created () {
    var loggedUser = this
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        loggedUser.user = user
        loggedUser.email = loggedUser.user.email
        loggedUser.name = loggedUser.user.displayName
        loggedUser.photo = loggedUser.user.photoURL
        loggedUser.userId = loggedUser.user.uid
      }
    })
    this.user = firebase.auth().currentUser || false
  },
  // Form validations
  validations: {
    name: {
      required,
      minLength: minLength(2)
    },
    deliveryRequest: {
      required,
      minLength: minLength(2)
    },
    place: {
      required,
      minLength: minLength(4)
    },
    deliveryFee: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(2)
    },
    dropOffLocation: {
      required,
      minLength: minLength(4)
    },
    dropOffTime: {
      required,
      minLength: minLength(4)
    },
    phoneNum: {
      required,
      minLength: minLength(8)
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
            name: this.name,
            deliveryRequest: this.deliveryRequest,
            place: this.place,
            deliveryFee: this.deliveryFee,
            dropOffLocation: this.dropOffLocation,
            dropOffTime: this.dropOffTime,
            phoneNum: this.phoneNum,
            usertoken: firebase.auth().currentUser.uid,
            profilephoto: firebase.auth().currentUser.photoURL,
            jobStatus: this.jobStatus,
            jobMessage: this.jobMessage
          }
          this.job = job
          console.log('Submitting in JobForm : ' + JSON.stringify(this.job, null, 5))
          this.$emit('job-is-created-updated', this.job)
        }, 500)
      }
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
  .formImage {
    width: 100px;
    height: 100px;
    border: 1px solid white;
    border-radius: 50%
  }
</style>
