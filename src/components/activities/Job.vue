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
        dropOffTime: '',
        phoneNum: ''
      },
      messagetitle: ' Request Delivery '
    }
  },
  components: {
    'job-form': JobForm
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    submitJob: function (job) {
      if (this.$store.getters['user/user']) {
        job.usertoken = this.$store.getters['user/user'].uid
      } else {
        job.usertoken = 'anon'
      }
      JobService.postJob(job)
        .then(response => {
          console.log('submitJob!')
          console.log('Submitting in submitJob : ' + JSON.stringify(job, null, 5))
          console.log(response)
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

</style>
