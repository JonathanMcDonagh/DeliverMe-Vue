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

    <!-- Jobs Table For Driver -->
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
        <!-- Driver -->
        <a slot="jobStatus" v-if="$store.state.isDriverLoggedIn || $store.state.isAdminLoggedIn" slot-scope="props" class="acceptText" @click="acceptJob(props.row._id)">{{props.row.jobStatus}}</a>
        <a slot="jobStatus" v-else slot-scope="props">You need to be a driver to accept jobs</a>
      </v-client-table>
      <div class="slideToRight">
        <p>Slide to the right to see <br>the rest of the table</p>
      </div>
    </div>

    <!-- Bottom Banner and Footer Components -->
    <BannerDriver></BannerDriver>
    <Footer></Footer>
  </div>
</template>

<script>
import Vue from 'vue'
import VueTables from 'vue-tables-2'
import JobService from '../../services/JobService'
import firebase from 'firebase'
import BannerDriver from '../views/BannerDriver'
import Footer from '../views/Footer'

Vue.use(VueTables.ClientTable, {compileTemplates: true, filterByColumn: true})

export default {
  name: 'Jobs',
  data () {
    return {
      messagetitle: ' Available Jobs ',
      jobs: [],
      status: '',
      props: ['_id'],
      errors: [],
      columns: ['user', 'name', 'deliveryRequest', 'place', 'deliveryFee', 'dropOffLocation', 'dropOffTime', 'jobStatus'],
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
          jobStatus: 'Accepted By'
        },
        filterable: ['deliveryRequest', 'place', 'deliveryFee', 'dropOffLocation', 'dropOffTime']
      }
    }
  },
  // Gets Components
  components: {
    'Footer': Footer,
    'BannerDriver': BannerDriver
  },
  // Fetches jobs when the component is created
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
  },
  methods: {
    // To Load jobs
    loadJobs: function () {
      JobService.fetchJobsByStatus('Not Accepted Yet')
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

  @media only screen and (max-width: 1024px) {
    .slideToRight {
      display: block !important;
    }
  }
</style>
