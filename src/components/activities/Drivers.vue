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
      <v-client-table :columns="columns" :data="drivers" :options="options">
        <a slot="like" slot-scope="props" class="fa fa-thumbs-o-up fa-2x" @click="like(props.row._id)"></a>
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
import Banner from '../views/BannerUser'
import Footer from '../views/Footer'
import Toasted from 'vue-toasted'

Vue.use(Toasted)
Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'drivers',
  data () {
    return {
      messagetitle: 'All Drivers',
      drivers: [],
      props: ['_id'],
      errors: [],
      columns: ['fname', 'lname', 'likes', 'like'],
      options: {
        perPage: 8,
        headings: {
          fname: 'First Name',
          lname: 'Last Name'
        },
        filterable: ['fname', 'lname', 'likes']
      }
    }
  },
  // Gets Components
  components: {
    'Footer': Footer,
    'Banner': Banner
  },
  // Loads drivers
  created () {
    this.loadDrivers()
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
    like: function (id) {
      DriverService.likeDriver(id)
        .then(response => {
          this.loadDrivers()
          Vue.toasted.show('You liked this driver').goAway(2500)
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
</style>
