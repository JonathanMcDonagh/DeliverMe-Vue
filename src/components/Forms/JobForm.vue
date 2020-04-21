<template>
  <form @submit.prevent="submit">
      <div class="col-lg-12 col-md-12 col-sm-12 align-center">

      <div class="form-content align-center">

        <!-- Displays users image above the form -->
        <div class="form-group">
          <img v-if="profilephoto" :src="profilephoto" class="formImage" />
          <img v-else class="formImage" src="../../assets/blankprofile.png" />
        </div>

        <!-- Displays users name which they cannot edit -->
        <div class="form-group"  :class="{ 'form-group--error': $v.name.$error }">
          <label class="form__label">Name</label>
          <input class="form__input" style="background-color: #def2f1" disabled v-model.trim="$v.name.$model"/>
          <div class="error" v-if="!$v.name.required">This Field Is Required</div>
          <div class="error" v-if="!$v.name.minLength">Field Must Have At Least {{$v.name.$params.minLength.min}} Letters.</div>
        </div>

        <div class="form-group" :class="{ 'form-group--error': $v.deliveryRequest.$error }">
          <label class="form__label">What Do You Need Delivered?</label>
          <input class="form__input" v-model.trim="$v.deliveryRequest.$model"/>
          <div class="error" v-if="!$v.deliveryRequest.required">This Field Is Required</div>
          <div class="error" v-if="!$v.deliveryRequest.minLength">Field Must Have At Least {{$v.deliveryRequest.$params.minLength.min}} Letters.</div>
        </div>

        <div class="form-group" :class="{ 'form-group--error': $v.place.$error }">
          <label class="form__label">Place You Want It From</label>
          <input class="form__input" v-model.trim="$v.place.$model">
          <div class="error" v-if="!$v.place.required">This Field Is Required</div>
          <div class="error" v-if="!$v.place.minLength">Field Must Have At Least {{$v.place.$params.minLength.min}} Letters.</div>
        </div>

        <div class="form-group" :class="{ 'form-group--error': $v.deliveryFee.$error }">
          <label class="form__label">Delivery Cost (€)</label>
          <input class="form__input" type="number" v-model.trim="$v.deliveryFee.$model"/>
          <div class="error" v-if="!$v.deliveryFee.required">This Field Is Required</div>
          <div class="error" v-if="!$v.deliveryFee.minLength">Field Must Have At Least {{$v.deliveryFee.$params.minLength.min}} Letters.</div>
          <div class="error" v-if="!$v.deliveryFee.maxLength">Field Cant Have More Than {{$v.deliveryFee.$params.minLength.min}} Letters.</div>
        </div>

        <div class="form-group" :class="{ 'form-group--error': $v.dropOffLocation.$error }">
          <label class="form__label">Drop Off Location</label>
          <input class="form__input" v-model.trim="$v.dropOffLocation.$model">
          <div class="error" v-if="!$v.dropOffLocation.required">This Field Is Required</div>
          <div class="error" v-if="!$v.dropOffLocation.minLength">Field Must Have At Least {{$v.dropOffLocation.$params.minLength.min}} Letters.</div>
        </div>

        <div class="form-group" :class="{ 'form-group--error': $v.dropOffTime.$error }">
          <label class="form__label">Drop Off Time (i.e. 1PM to 2PM)</label>
          <input class="form__input" v-model.trim="$v.dropOffTime.$model">
          <div class="error" v-if="!$v.dropOffTime.required">This Field Is Required</div>
          <div class="error" v-if="!$v.dropOffTime.minLength">Field Must Have At Least {{$v.dropOffTime.$params.minLength.min}} Letters.</div>
        </div>

        <div class="form-group" :class="{ 'form-group--error': $v.phoneNum.$error }">
          <label class="form__label">Phone Number</label>
          <input class="form__input" type="number" v-model.trim="$v.phoneNum.$model"/>
          <div class="error" v-if="!$v.phoneNum.required">This Field Is Required</div>
          <div class="error" v-if="!$v.phoneNum.minLength">Field Must Have At Least {{$v.phoneNum.$params.minLength.min}} Numbers.</div>
        </div>

        <p>
          <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Place Job (Cash)</button>
        </p>

      <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your request someone will be in contact with you shortly</p>
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
      usertoken: firebase.auth().currentUser.uid, // gets the user ID to store in the job
      profilephoto: firebase.auth().currentUser.photoURL, // gets the user photo url to store in the job
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
      minLength: minLength(2)
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
    border-radius: 1.5rem;
    border: 2px solid #3AAFA9;
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

  input.form__input {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
</style>
