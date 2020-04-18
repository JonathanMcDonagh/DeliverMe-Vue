<template>

  <div class="hero">

    <div class="banner-header">
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

  <div id="app1">
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <template v-if="childDataLoaded">
            <job-form :job="job" jobBtnTitle="Update Job"
                           @job-is-created-updated="updateJob"></job-form>
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
import JobForm from '../Forms/JobForm'
import JobService from '../../services/JobService'
import Footer from '../views/Footer'
import Banner from '../views/Banner'

export default {
  data () {
    return {
      messagetitle: 'Edit Delivery Details',
      job: {},
      childDataLoaded: false,
      temp: {}
    }
  },
  // Request Job Form
  components: {
    'job-form': JobForm,
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
    updateJob: function (job) {
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
    width: 100%;
    margin-bottom: 5%;
    margin-top: 5%;
  }

  .vue-title {
    margin-top: 125px;
    text-align: center;
    font-size: 30pt;
    margin-bottom: 10px;
    color: #17252A;
  }
</style>
