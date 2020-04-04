<template>
  <div class="hero">
    <h3 class="vue-title">Manage Drivers</h3>
    <div id="app1">
      <v-client-table :columns="columns" :data="drivers" :options="options">
        <a slot="delete" slot-scope="props" class="fa fa-trash-o fa-2x" @click="deleteDriver(props.row._id)"></a>
      </v-client-table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueTables from 'vue-tables-2'
import DriverService from '../../services/DriverService'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'drivers',
  data () {
    return {
      drivers: [],
      props: ['_id'],
      errors: [],
      columns: ['fname', 'lname', 'email', 'delete'],
      options: {
        perPage: 8,
        headings: {
          fname: 'First Name',
          lname: 'Last Name',
          email: 'Email'
        },
        filterable: ['fname', 'lname', 'email']
      }
    }
  },
  // Loads drivers
  created () {
    this.loadDrivers()
  },
  methods: {
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
    margin: 0 auto;
  }
  .vue-title {
    margin-top: 100px;
    text-align: center;
    font-size: 30pt;
    margin-bottom: 10px;
  }
</style>
