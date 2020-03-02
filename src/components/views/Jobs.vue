<template>
  <div class="hero">
    <h4 class="vue-title">{{messagetitle}}</h4>
    <div id="app1">
      <v-client-table :columns="columns" :data="jobs" :options="options">
        <!-- Driver -->
        <a slot="accept" v-if="user" slot-scope="props" class="fa fa-check-circle-o fa-2x" @click="acceptJob(props.row._id)"></a>
        <p v-else>Only Drivers have this right, to apply as a driver click <a href="/RegisterAsDriver">here</a></p>
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
  name: 'Jobs',
  data () {
    return {
      messagetitle: ' All Jobs ',
      jobs: [],
      props: ['_id'],
      errors: [],
      columns: ['name', 'deliveryRequest', 'place', 'deliveryFee', 'dropOffLocation', 'dropOffTime', 'accept'],
      options: {
        perPage: 8,
        headings: {
          name: 'Name',
          deliveryRequest: 'Delivery Request',
          place: 'Collection Place',
          deliveryFee: 'Delivery Fee',
          dropOffLocation: 'Drop Off Location',
          dropOffTime: 'Drop Off Time'
        }
      }
    }
  },
  // Fetches Items when the component is created.
  created () {
    this.loadJobs()
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
    loadJobs: function () {
      JobService.fetchJobs()
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
    acceptJob: function () {
      this.$swal({
        title: 'Are you sure you want to accept this job?',
        text: 'You can\'t undo this action later',
        type: 'info',
        showCancelButton: true,
        confirmButtonText: 'OK Accept Job',
        cancelButtonText: 'No Take Me Back',
        showCloseButton: true
        // showLoaderOnConfirm: true
      }).then((result) => {
        console.log('SWAL Result : ' + result)
        if (result === true) {
          JobService()
            .then(response => {
              // JSON responses are automatically parsed.
              this.message = response.data
              console.log(this.message)
              this.loadJobs()
              // Vue.nextTick(() => this.$refs.vuetable.refresh())
              this.$swal('Accepted', 'You successfully accepted this job ')
            })
            .catch(error => {
              this.$swal('ERROR', 'Something went wrong trying to accept ' + error, 'error')
              this.errors.push(error)
              console.log(error)
            })
        } else {
          console.log('SWAL Else Result : ' + result)
          this.$swal('Cancelled', 'Item is still there!', 'info')
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
</style>
