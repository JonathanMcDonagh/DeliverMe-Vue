<template>
  <div class="hero">
    <h3 class="vue-title">My Jobs</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="jobs" :options="options">
        <a slot="user" slot-scope="props">
          <div v-if="props.row.profilephoto">
            <img :src="props.row.profilephoto" class="profileImage">
          </div>
          <div v-else>
            <img src="../../assets/blankprofile.png" class="profileImage"><br>
          </div>
        </a>
        <!-- User -->
        <a slot="edit" slot-scope="props" class="fa fa-pencil-square-o fa-2x" @click="editJob(props.row._id)"></a>
        <a slot="delete" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteJob(props.row._id)"></a>
      </v-client-table>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import VueTables from 'vue-tables-2'
import JobService from '../../services/JobService'
import firebase from 'firebase'
Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  data () {
    return {
      columns: ['user', 'name', 'deliveryRequest', 'place', 'deliveryFee', 'dropOffLocation', 'dropOffTime', 'jobStatus', 'edit', 'delete'],
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
          jobStatus: 'Job Status'
        },
        filterable: [''],
        sortable: ['deliveryFee'],
        uniqueKey: '_id'
      }
    }
  },
  // Loads all jobs
  created () {
    this.loadJobs()
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
    loadJobs: function () {
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
    // To Edit jobs
    editJob: function (id) {
      this.$router.params = id
      this.$router.push('edit')
      console.log(this.$router.params)
    },
    // To Delete jobs
    deleteJob: function (id) {
      this.$swal({
        title: 'Are you sure?',
        text: 'You can\'t undo this action',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK Delete it',
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
              this.loadJobs()
              this.$swal('Deleted', 'You successfully deleted this job')
            })
            .catch(error => {
              this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error')
              this.errors.push(error)
              console.log(error)
            })
        } else {
          this.$swal('Cancelled', 'Your job is still there!', 'info')
        }
      })
    }
  }
}
</script>
<style scoped>
  #app1 {
    width: 80%;
    margin: 0 auto;
  }
  .vue-title {
    margin-top: 100px;
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

</style>
