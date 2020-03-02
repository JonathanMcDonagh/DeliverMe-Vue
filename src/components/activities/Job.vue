<template>
  <div id="app1" class="hero">
    <h4 class="vue-title">{{messagetitle}}</h4>
    <div class="container mt-3 mt-sm-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <job-form :job="job" jobBtnTitle="Submit Job"
                         @job-is-created-updated="submitJob"></job-form>
        </div><!-- /col -->
      </div><!-- /row -->
    </div><!-- /container -->
  </div>
</template>

<script>
import Vue from 'vue'
import VueSweetalert from 'vue-sweetalert'
import JobService from '../../services/JobService'
import {Vuelidate} from 'vuelidate'
import JobForm from '../views/JobForm'

Vue.use(Vuelidate)
Vue.use(VueSweetalert)

export default {
  data () {
    return {
      job: {
        photo: '',
        name: '',
        deliveryRequest: '',
        place: '',
        deliveryFee: '',
        dropOffLocation: '',
        dropOffTime: ''
      },
      messagetitle: ' Request Delivery '
    }
  },
  components: {
    'job-form': JobForm
  },
  methods: {
    submitJob: function (job) {
      console.log()
      JobService.postJob(job)
        .then(response => {
          console.log(response)
          console.log(job)
          this.$router.push('/managejobs')
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

  .form-content {
    padding: 5%;
    border: 1px solid #ced4da;
    margin-bottom: 2%;
  }
  .form-control {
    border-radius: 1.5rem;
  }
</style>
