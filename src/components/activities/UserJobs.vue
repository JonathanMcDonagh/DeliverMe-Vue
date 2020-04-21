<template>
  <div class="hero">

    <!-- Top Banner -->
    <div class="banner-header">
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

    <!-- Jobs Table For Users -->
    <div id="app1">
      <h3 v-if="user == null">You must be logged in to view your jobs</h3>
      <v-client-table :columns="columns" :data="jobs" :options="options">
        <a slot="user" slot-scope="props">
          <div v-if="props.row.profilephoto">
            <router-link to="/account">
            <img :src="props.row.profilephoto" class="profileImage">
            </router-link>
          </div>
          <div v-else>
            <img src="../../assets/blankprofile.png" class="profileImage"><br>
          </div>
        </a>

        <!-- User -->
        <a slot="jobStatus" slot-scope="props" class="acceptText" @click="viewUserJob(props.row._id)">{{props.row.jobStatus}}</a>
        <a slot="completed" slot-scope="props" class="fa fa-check-square-o  fa-2x" @click="completedJob(props.row._id)"></a>
        <a slot="edit" slot-scope="props" class="fa fa-pencil-square-o fa-2x" @click="editUserJob(props.row._id)"></a>
        <a slot="delete" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteUserJob(props.row._id)"></a>
      </v-client-table>
      <div class="slideToRight">
      <p>Slide to the right to see <br>the rest of the table</p>
      </div>
    </div>

    <!-- Bottom Banner and Footer Components -->
    <Banner></Banner>
    <Footer></Footer>
  </div>
</template>

<script>
import firebase from 'firebase'
import Vue from 'vue'
import VueTables from 'vue-tables-2'
import JobService from '../../services/JobService'
import Footer from '../views/Footer'
import Banner from '../views/BannerUser'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  data () {
    return {
      messagetitle: ' My Deliveries ',
      columns: ['user', 'name', 'deliveryRequest', 'place', 'deliveryFee', 'dropOffLocation', 'dropOffTime', 'jobStatus', 'completed', 'edit', 'delete'],
      jobs: [],
      props: ['_id'],
      errors: [],
      options: {
        headings: {
          user: '',
          name: 'Name',
          deliveryRequest: 'Delivery Request',
          place: 'Collection Place',
          deliveryFee: 'Delivery Fee',
          dropOffLocation: 'Drop Off Location',
          dropOffTime: 'Drop Off Time',
          jobStatus: 'Accepted By',
          completed: 'Mark Completed'
        },
        filterable: ['']
      }
    }
  },
  // Gets Components
  components: {
    'Banner': Banner,
    'Footer': Footer
  },
  // Loads all user jobs
  created () {
    this.loadUserJobs()
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
    // Loads jobs by usertoken/userID
    loadUserJobs: function () {
      JobService.fetchUserJobs(firebase.auth().currentUser.uid)
        .then(response => {
          // JSON responses are automatically parsed.
          this.jobs = response.data
          console.log(this.jobs)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    // Deletes Job but user sees mark as complete
    completedJob: function (id) {
      this.$swal({
        title: 'Has this job be successfully completed?',
        text: 'You can\'t undo this action',
        type: 'success',
        showCancelButton: true,
        confirmButtonText: 'Mark Completed',
        cancelButtonText: 'Cancel',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        console.log('SWAL Result : ' + result)
        if (result === true) {
          JobService.deleteJob(id)
            .then(response => {
              this.message = response.data
              console.log(this.message)
              this.loadUserJobs()
              this.$swal('Completed', 'This job has been completed')
            })
            .catch(error => {
              this.$swal('ERROR', 'Something went wrong trying to complete ' + error, 'error')
              this.errors.push(error)
              console.log(error)
            })
        } else {
          this.$swal('Cancelled', 'Your job is still there!', 'info')
        }
      })
    },
    // To view accepted job details
    viewUserJob: function (id) {
      this.$router.params = id
      this.$router.push('jobdetails')
    },
    // To Edit jobs
    editUserJob: function (id) {
      this.$router.params = id
      this.$router.push('edit')
      console.log(this.$router.params)
    },
    // To Delete jobs
    deleteUserJob: function (id) {
      this.$swal({
        title: 'Are you sure?',
        text: 'You can\'t undo this action later',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK Delete It',
        cancelButtonText: 'No Take Me Back',
        showCloseButton: true
      }).then((result) => {
        console.log('SWAL Result : ' + result)
        if (result === true) {
          JobService.deleteJob(id)
            .then(response => {
              this.message = response.data
              console.log(this.message)
              this.loadUserJobs()
              this.$swal('Deleted', 'You successfully deleted this job ')
            })
            .catch(error => {
              this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error')
              this.errors.push(error)
              console.log(error)
            })
        } else {
          this.$swal('Cancelled', 'Item is still there!', 'info')
        }
      })
    }
  }
}
</script>

<style scoped>
  .swal2-shown { display:flex; height:100vh; }

  #app1 {
    width: 80%;
    margin: 5% auto;
  }

  .vue-title {
    margin-top: 125px;
    text-align: center;
    font-size: 30pt;
    margin-bottom: 10px;
  }
  .profileImage {
    color: white;
    font-size: 10px;
    border: 1px solid white;
    border-radius: 50%;
    width: 50px;
  }

  .acceptText {
    color: #3AAFA9 !important;
  }

  .acceptText:hover {
    text-decoration: underline !important;
    cursor: pointer;
  }

  .slideToRight {
    display: none;
  }

  @media only screen and (max-width: 1024px) {
    .slideToRight {
      display: block !important;
    }
  }

  .nav {
    background: grey;
    color: white;
    height: 80px;
    padding: 20px;
    text-align: right;
  }
  .content {
    background-color: lightblue;
    padding: 30px;
  }
  button {
    margin-bottom: 50px;
  }

  .bottom p {
    margin-bottom: 0;
    line-height: 50px;
    font-size: 16px;
    font-weight: 400;
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
