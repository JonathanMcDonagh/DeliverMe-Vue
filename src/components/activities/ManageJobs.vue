<template>
  <div class="hero">
    <h4 class="vue-title">{{messagetitle}}</h4>
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

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'Jobs',
  data () {
    return {
      messagetitle: ' Manage Deliveries ',
      jobs: [],
      props: ['_id'],
      errors: [],
      columns: ['user', 'name', 'deliveryRequest', 'place', 'deliveryFee', 'dropOffLocation', 'dropOffTime', 'edit', 'delete'],
      options: {
        perPage: 8,
        headings: {
          user: 'User',
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
    editJob: function (id) {
      this.$router.params = id
      this.$router.push('edit')
    },
    deleteJob: function (id) {
      this.$swal({
        title: 'Are you sure?',
        text: 'You can\'t undo this action later',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK Delete It',
        cancelButtonText: 'No Take Me Back',
        showCloseButton: true
        // showLoaderOnConfirm: true
      }).then((result) => {
        console.log('SWAL Result : ' + result)
        if (result === true) {
          JobService.deleteJob(id)
            .then(response => {
              // JSON responses are automatically parsed.
              this.message = response.data
              console.log(this.message)
              this.loadJobs()
              // Vue.nextTick(() => this.$refs.vuetable.refresh())
              this.$swal('Deleted', 'You successfully deleted this job ')
            })
            .catch(error => {
              this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error')
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
  .profileImage {
    color: white;
    font-size: 10px;
    border: 1px solid white;
    border-radius: 50%;
    width: 50px;
  }
</style>
