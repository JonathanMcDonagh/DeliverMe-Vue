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

    <!-- User Information -->
    <div id="app1">
    <hr>
      <p>Image of the documentation you provided</p>
      <img :src="uploadURL" style='height: 120px'> <br>
      <p>Name: {{fname}} {{lname}}</p>
      <p>Email: {{driverEmail}}</p>
    <hr>
    </div>

    <!-- Bottom Banner and Footer Components -->
    <Banner></Banner>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../views/Footer'
import Banner from '../views/BannerDriver'

export default {
  data () {
    return {
      messagetitle: ' My Account ',
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
  // Gets Components
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
