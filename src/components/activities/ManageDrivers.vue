<template>
  <!-- Admin Page To Manage Drivers -->
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

    <div id="app1">

      <!-- Drivers Table -->
      <v-client-table :columns="columns" :data="drivers" :options="options">
        <a slot="driver" slot-scope="props">
          <div v-if="props.row.driverprofilepicture">
            <img :src="props.row.driverprofilepicture" class="profileImage">
          </div>
          <div v-else>
            <img src="../../assets/blankprofile.png" class="profileImage"><br>
          </div>
        </a>
        <a slot="delete" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteDriver(props.row._id)"></a>
      </v-client-table>
    </div>

    <!-- Bottom Banner and Footer Components -->
    <Banner></Banner>
    <Footer></Footer>
  </div>
</template>

<script>
import Vue from 'vue'
import VueTables from 'vue-tables-2'
import DriverService from '../../services/DriverService'
import Footer from '../views/Footer'
import Banner from '../views/BannerDriver'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'drivers',
  data () {
    return {
      messagetitle: 'Manage Drivers',
      drivers: [],
      props: ['_id'],
      errors: [],
      columns: ['driver', 'fname', 'lname', 'email', 'uploadURL', 'likes', 'delete'],
      options: {
        perPage: 8,
        headings: {
          fname: 'First Name',
          lname: 'Last Name',
          email: 'Email',
          uploadURL: 'Document'
        },
        filterable: ['fname', 'lname', 'email']
      }
    }
  },
  // Loads drivers
  created () {
    this.loadDrivers()
  },
  // Gets Components
  components: {
    'Banner': Banner,
    'Footer': Footer
  },
  methods: {
    // Fetches all drivers
    loadDrivers: function () {
      DriverService.fetchDrivers()
        .then(response => {
          // JSON responses are automatically parsed.
          this.drivers = response.data
          console.log(this.drivers)
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    // Code to delete the driver based on the driver ID
    deleteDriver: function (id) {
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
          DriverService.deleteDriver(id)
            .then(response => {
              this.message = response.data
              console.log(this.message)
              this.loadDrivers()
              this.$swal('Deleted', 'You successfully deleted this driver')
            })
            .catch(error => {
              this.$swal('ERROR', 'Something went wrong trying to Delete ' + error, 'error')
              this.errors.push(error)
              console.log(error)
            })
        } else {
          this.$swal('Cancelled', 'Your driver is still there!', 'info')
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
  .profileImage {
    color: white;
    font-size: 10px;
    border: 1px solid white;
    width: 100px;
  }
</style>
