<template>
  <form @submit.prevent="submit">

    <div v-show="step === 1">
    <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
      <label class="form__label">Name</label>
      <input class="form__input" v-model.trim="$v.name.$model"/>
    </div>
    <div class="error" v-if="!$v.name.required">This field is Required</div>
    <div class="error" v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}} letters.</div>

    <div class="form-group" :class="{ 'form-group--error': $v.deliveryRequest.$error }">
      <label class="form__label">What do you need delivered?</label>
      <input class="form__input" v-model.trim="$v.deliveryRequest.$model"/>
    </div>
    <div class="error" v-if="!$v.deliveryRequest.required">This field is Required</div>
    <div class="error" v-if="!$v.deliveryRequest.minLength">Field must have at least {{$v.deliveryRequest.$params.minLength.min}} letters.</div>

    <div class="form-group" :class="{ 'form-group--error': $v.place.$error }">
      <label class="form__label">Place</label>
      <input class="form__input" v-model.trim="$v.place.$model"/>
    </div>
    <div class="error" v-if="!$v.place.required">This field is Required</div>
    <div class="error" v-if="!$v.place.minLength">Description must have at least {{$v.place.$params.minLength.min}} letters.</div>

    <div class="form-group" :class="{ 'form-group--error': $v.deliveryFee.$error }">
      <label class="form__label">How much are you willing to pay for delivery?</label>
      <input class="form__input" v-model.trim="$v.deliveryFee.$model"/>
    </div>
    <div class="error" v-if="!$v.deliveryFee.required">This field is Required</div>
    <div class="error" v-if="!$v.deliveryFee.minLength">Field must have at least {{$v.deliveryFee.$params.minLength.min}} letters.</div>
      <div class="error" v-if="!$v.deliveryFee.maxLength">Field must only have {{$v.deliveryFee.$params.maxLength.max}} letters.</div>

    <div class="form-group" :class="{ 'form-group--error': $v.dropOffLocation.$error }">
      <label class="form__label">Drop Off Location</label>
      <input class="form__input" v-model.trim="$v.dropOffLocation.$model"/>
    </div>
    <div class="error" v-if="!$v.dropOffLocation.required">This field is Required</div>
    <div class="error" v-if="!$v.dropOffLocation.minLength">Field must have at least {{$v.dropOffLocation.$params.minLength.min}} letters.</div>

    <div class="form-group" :class="{ 'form-group--error': $v.dropOffTime.$error }">
      <label class="form__label">Drop Off Time</label>
      <input class="form__input" v-model.trim="$v.dropOffTime.$model"/>
    </div>
    <div class="error" v-if="!$v.dropOffTime.required">This field is Required</div>
    <div class="error" v-if="!$v.dropOffTime.minLength">Field must have at least {{$v.dropOffTime.$params.minLength.min}} letters.</div>

      <button class="btn btn-primary btn1" id="nextBtn" @click.prevent="next()">Go To Payment ⇢</button>
    </div>

    <div v-show="step === 2">

      <button class="btn btn-primary btn1" @click.prevent="prev()">⇠ Go Back</button><br>
      <p>
      <button class="btn btn-primary btn1" type="submit" :disabled="submitStatus === 'PENDING'">Request Delivery</button>
    </p>
    </div>

    <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your request someone will be in contact with you shortly</p>
    <p class="typo__p" v-if="submitStatus === 'ERROR'">Please Fill in the Form Correctly.</p>
    <p class="typo__p" v-if="submitStatus === 'PENDING'">adding...</p>
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
  props: ['jobBtnTitle', 'job', 'user'],
  data () {
    return {
      step: 1,
      messagetitle: ' Job ',
      userId: this.userId,
      name: this.job.name,
      deliveryRequest: this.job.deliveryRequest,
      place: this.job.place,
      deliveryFee: this.job.deliveryFee,
      dropOffLocation: this.job.dropOffLocation,
      dropOffTime: this.job.dropOffTime,
      submitStatus: null
    }
  },
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
    }
  },
  created () {
    var loggedUser = this
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        loggedUser.user = user
        loggedUser.name = loggedUser.user.displayName
        loggedUser.photo = loggedUser.user.photoURL
        loggedUser.userId = loggedUser.user.uid
      }
    })
    this.user = firebase.auth().currentUser || false
  },
  methods: {
    submit () {
      console.log('submit!')
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
          var job = {
            userId: this.userId,
            name: this.name,
            deliveryRequest: this.deliveryRequest,
            place: this.place,
            deliveryFee: this.deliveryFee,
            dropOffLocation: this.dropOffLocation,
            dropOffTime: this.dropOffTime
          }
          this.job = job
          console.log('Submitting in JobForm : ' + JSON.stringify(this.job, null, 5))
          this.$emit('job-is-created-updated', this.job)
        }, 500)
      }
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
    border-color: #3AAFA9;
    background: #3AAFA9;
    color: whitesmoke;
  }
  .btn-primary {
    background-color: #3AAFA9;
    border-color: #3AAFA9;
  }
  .btn-primary:hover {
    color: #3AAFA9;
    border: 2px solid #3AAFA9;
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
</style>
