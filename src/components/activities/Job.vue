<template>
  <div class="hero">

    <div class="banner-header">
      <div class="row">
        <div class="banner-header-bg">
          <div class="container">
            <div class="container text-left">
              <h3 class="vue-title" style="color: #feffff">{{messagetitle}}</h3>
              <div class="breadcrumbs_path">
                <a><router-link style="color: #feffff" to="/">Home</router-link></a> > {{messagetitle}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="app1">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 align-center">
          <job-form :job="job" jobBtnTitle="Submit Job"
                    @job-is-created-updated="submitJob"></job-form>
        </div><!-- /col -->
      </div><!-- /row -->
    </div><!-- /container -->
    </div>
    <Banner></Banner>
    <Footer></Footer>
  </div>
</template>

<script>
import Vue from 'vue'
import VueSweetalert from 'vue-sweetalert'
import JobService from '../../services/JobService'
import {Vuelidate} from 'vuelidate'
import JobForm from '../views/JobForm'
import firebase from 'firebase'
import Footer from '../views/Footer'
import Banner from '../views/Banner'

Vue.use(Vuelidate)
Vue.use(VueSweetalert)

export default {
  data () {
    return {
      messagetitle: ' Request Delivery ',
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
    'job-form': JobForm,
    'Banner': Banner,
    'Footer': Footer
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
    width: 100%;
  }
  .vue-title {
    margin-top: 125px;
    text-align: center;
    font-size: 30pt;
    margin-bottom: 10px;
    color: #3AAFA9;
  }

  #app1 {
    margin-bottom: 5%;
    margin-top: 5%;
  }

  .banner-header-bg {
    background-color: #3AAFA9;
    padding: 42px 0 55px;
    width:100%;
  }
  .banner-header h1 {
    color: #ffffff;
    font-size: 28px;
    font-weight: 600;
    line-height: 40px;
    position: relative;
    text-transform: capitalize;
  }
  .breadcrumbs_path {
    color: #fff;
    margin-top: 8px;
    position: relative;
    z-index: 9;
  }
  .breadcrumbs_path > a {
    color: #fff;
    transition: all 0.3s ease 0s;
  }

</style>
