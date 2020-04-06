<template>
  <div id="app1" class="hero">
    <h3 class="vue-title">Accept Job</h3>
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
</template>

<script>
import AcceptJobForm from '../views/AcceptJobForm'
import JobService from '../../services/JobService'

export default {
  data () {
    return {
      job: {},
      childDataLoaded: false,
      temp: {}
    }
  },
  // Request Job Form
  components: {
    'accept-form': AcceptJobForm
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
    margin: 0 auto;
  }

  .vue-title {
    margin-top: 100px;
    text-align: center;
    font-size: 30pt;
    margin-bottom: 10px;
    color: #17252A;
  }
</style>
