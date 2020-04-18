<template>
  <div class="hero">
    <h3 class="vue-title">Manage Deliveries</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="jobs" :options="options">
        <!-- User Image -->
        <a slot="user" slot-scope="props">
          <div v-if="props.row.profilephoto">
            <img :src="props.row.profilephoto" class="profileImage">
          </div>
          <div v-else>
            <!-- If the users image doesn't exist -->
            <img src="../../assets/blankprofile.png" class="profileImage"><br>
          </div>
        </a>
        <a slot="jobStatus" v-if="$store.state.isDriverLoggedIn || $store.state.isAdminLoggedIn" slot-scope="props" class="acceptText" @click="acceptJob(props.row._id)">{{props.row.jobStatus}}</a>
        <a slot="jobStatus" v-else slot-scope="props">You need to be a driver to accept jobs</a>
        <a slot="delete" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteJob(props.row._id)"></a>
      </v-client-table>
      <div class="slideToRight">
        <p>Slide to the right to see <br>the rest of the table</p>
      </div>
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
      columns: ['user', 'name', 'deliveryRequest', 'place', 'deliveryFee', 'dropOffLocation', 'dropOffTime', 'jobStatus', 'phoneNum', 'delete'],
      jobs: [],
      props: ['_id'],
      errors: [],
      options: {
        perPage: 8,
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
        filterable: ['name', 'deliveryRequest', 'place', 'deliveryFee', 'dropOffLocation', 'dropOffTime']
      }
    }
  },
  // Loads all jobs
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
    // To Accept jobs
    acceptJob: function (id) {
      this.$router.params = id
      this.$router.push('accept')
    },
    // To Delete jobs
    deleteJob: function (id) {
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
              this.loadJobs()
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
  .profileImage {
    color: white;
    font-size: 10px;
    border: 1px solid #ffffff;
    border-radius: 50%;
    width: 50px;
  }

  .slideToRight {
    display: none;
  }

  @media only screen and (max-width: 1024px) {
    .slideToRight {
      display: block !important;
    }
  }
</style>
