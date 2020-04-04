<template>
  <div class="hero">
    <h3 class="vue-title">{{messagetitle}}</h3>
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
      messagetitle: ' My Jobs ',
      columns: ['user', 'name', 'deliveryRequest', 'place', 'deliveryFee', 'dropOffLocation', 'dropOffTime', 'edit', 'delete'],
      jobs: [],
      props: ['_id'],
      errors: [],
      options: {
        headings: {
          user: 'User',
          name: 'Name',
          deliveryRequest: 'Delivery Request',
          place: 'Collection Place',
          deliveryFee: 'Delivery Fee',
          dropOffLocation: 'Drop Off Location',
          dropOffTime: 'Drop Off Time'
        },
        filterable: [''],
        sortable: ['deliveryFee'],
        uniqueKey: '_id'
      }
    }
  },
  // Fetches Jobs when the component is created.
  created () {
    this.loadJobs()
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

    this.loadDriverDetails()
    this.loadAdminDetails()
    this.getDriver()
  },
  methods: {
    loadJobs: function () {
      JobService.fetchUserJobs(firebase.auth().currentUser.uid)
        .then(response => {
          this.jobs = response.data
          console.log(this.jobs)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    editJob: function (id) {
      this.$router.params = id
      this.$router.push('edit')
      console.log(this.$router.params)
    },
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
          // JobService.deleteJob(id)
            .then(response => {
              // JSON responses are automatically parsed.
              this.message = response.data
              console.log(this.message)
              this.loadJobs()
              Vue.nextTick(() => this.$refs.vuetable.refresh())
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
