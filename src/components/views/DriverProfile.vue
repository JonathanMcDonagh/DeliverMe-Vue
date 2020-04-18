<template>
  <div class="hero">
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
    <h3 class="vue-title">My Account Details</h3>
    <hr>
    <p>Image of the documentation you provided</p>
    <img :src="uploadURL" style='height: 120px'> <br>
    <p>Name: {{fname}} {{lname}}</p>
    <p>Email: {{driverEmail}}</p>
    <hr>
  </div>
    <Banner></Banner>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../views/Footer'
import Banner from '../views/Banner'

export default {
  data () {
    return {
      fname: '',
      lname: '',
      driverEmail: '',
      uploadURL: ''
    }
  },
  created () {
    this.loadDriverDetails()
    this.getDriver()
  },
  components: {
    'Banner': Banner,
    'Footer': Footer
  },
  methods: {
    loadDriverDetails () {
      this.fname = this.$store.state.driver.fname
      this.lname = this.$store.state.driver.lname
      this.driverEmail = this.$store.state.driver.email
      this.uploadURL = this.$store.state.driver.uploadURL
    }
  }
}
</script>

<style>
  .vue-title {
    margin-top: 125px;
    text-align: center;
    font-size: 30pt;
    margin-bottom: 10px;
    color: #3AAFA9;
  }
</style>
