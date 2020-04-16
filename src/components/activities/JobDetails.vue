<template>
  <div class="hero">

    <div class="banner-header">
      <div class="row">
        <div class="banner-header-bg">
          <div class="container">
            <div class="container text-left">
              <h3 class="vue-title" style="color: #feffff">{{messagetitle}}</h3>
              <div class="breadcrumbs_path">
                <a><router-link style="color: #feffff" to="/">Home</router-link></a> > <a><router-link style="color: #feffff" to="/myjobs">My Deliveries</router-link></a> > {{messagetitle}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  <div id="app1">
    <h3 class="vue-title">Job Details From Driver</h3>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <template v-if="childDataLoaded">
            <accept-form :job="job" jobBtnTitle="Accept Job"
                           @job-is-created-updated="updateStatus"></accept-form>
          </template>
        </div>
      </div>
    </div>
  </div>
    <Banner></Banner>
    <Footer></Footer>
  </div>
</template>

<script>
import AcceptedJobDetailsForm from '../views/JobDetailsForm'
import JobService from '../../services/JobService'
import Footer from '../views/Footer'
import Banner from '../views/Banner'

export default {
  data () {
    return {
      messagetitle: ' Job Details ',
      job: {},
      childDataLoaded: false,
      temp: {}
    }
  },
  // Request Job Form
  components: {
    'accept-form': AcceptedJobDetailsForm,
    'Banner': Banner,
    'Footer': Footer
  },
  created () {
    this.getJob()
  },
  methods: {
    // To select the job to edit
    getJob: function () {
      JobService.fetchJob(this.$router.params)
        .then(response => {
          this.temp = response.data
          this.job = this.temp[0]
          this.childDataLoaded = true
          console.log('Getting Job in Edit: ' + JSON.stringify(this.job, null, 5))
        })
        .catch(error => {
          this.errors.push(error)
          console.log(error)
        })
    },
    // To update the job
    updateStatus: function (job) {
      console.log('Before PUT ' + JSON.stringify(job, null, 5))
      JobService.putJob(this.$router.params, job)
        .then(response => {
          console.log(response)
          console.log('AFTER PUT ' + JSON.stringify(job, null, 5))
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
  #app1 {
    width: 95%;
  }

  .hero {
    margin: 5% auto;
  }

  .vue-title {
    margin-top: 125px;
    text-align: center;
    font-size: 30pt;
    margin-bottom: 10px;
    color: #3AAFA9;
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
