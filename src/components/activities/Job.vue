<template>
  <div id="app1" class="hero">
    <h3 class="vue-title">Request Delivery</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <job-form :job="job" jobBtnTitle="Submit Job"
                    @job-is-created-updated="submitJob"></job-form>
        </div><!-- /col -->
      </div><!-- /row -->
    </div><!-- /container -->
  </div>
</template>

<script>
import Vue from 'vue'
import VueSweetalert from 'vue-sweetalert'
import JobService from '../../services/JobService'
import {Vuelidate} from 'vuelidate'
import JobForm from '../views/JobForm'
import firebase from 'firebase'

Vue.use(Vuelidate)
Vue.use(VueSweetalert)

export default {
  data () {
    return {
      job: {
        name: '',
        deliveryRequest: '',
        place: '',
        deliveryFee: '',
        dropOffLocation: '',
        dropOffTime: '',
        phoneNum: '',
        usertoken: firebase.auth().currentUser.uid, // gets the user ID to store in the job
        profilephoto: firebase.auth().currentUser.photoURL, // gets the user photo url to store in the job
        jobStatus: 'Not Accepted Yet',
        jobMessage: 'No Message Yet'
      }
    }
  },
  // Request Job Form
  components: {
    'job-form': JobForm
  },
  created () {
    // Gets user information from Firebase
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
  methods: {
    // Submits Jobs with UID and photoURL
    submitJob: function (job) {
      job.usertoken = firebase.auth().currentUser.uid
      job.profilephoto = firebase.auth().currentUser.photoURL

      JobService.postJob(job)
        .then(response => {
          console.log('submitJob!')
          console.log('Submitting in submitJob : ' + JSON.stringify(job, null, 5))
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
  #app1 {
    width: 95%;
    margin: 0 auto;
  }
  .vue-title {
    margin-top: 100px;
    text-align: center;
    font-size: 30pt;
    margin-bottom: 10px;
    color: #17252A;
  }

</style>
