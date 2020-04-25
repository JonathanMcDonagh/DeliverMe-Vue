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
    <div id="app1" style="margin-top: 5%; margin-bottom: 5%">
      <div class="profileCard">
        <img :src="driverprofilepicture" alt="Profile Image" style="width:100%">
        <h1>{{fname}} {{lname}}</h1>
        <p class="driveremail">{{driverEmail}}</p>
        <p class="driveremail">Registered Driver For DeliverMe</p>
        <p class="driveremail">Total Likes: {{likes}}</p>
        <p class="driveremail">Uploaded Documentation:</p>

        <a :href="uploadURL" class="profileLink" target="_blank">
          <div class="imageContainer">
            <img :src="uploadURL" alt="Avatar" class="image">
            <div class="overlay">
              <div class="text">Click To Open Document</div>
            </div>
          </div>
        </a>
        <p><button class="profileBtn" @click="findJob">Find A Job</button></p>
      </div>
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
      props: ['id'],
      messagetitle: ' My Account ',
      fname: '',
      lname: '',
      driverEmail: '',
      uploadURL: '',
      driverprofilepicture: '',
      likes: 0
    }
  },
  created () {
    this.loadDriverDetails()
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
      this.driverprofilepicture = this.$store.state.driver.driverprofilepicture
      this.likes = this.$store.state.driver.likes
    },
    // Find Job
    findJob: function () {
      this.$router.push('jobs')
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

  .profileCard {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    max-width: 500px;
    margin: 5% auto;
    text-align: center;
    font-family: arial;
  }

  .driveremail {
    color: grey;
    font-size: 18px;
  }

  .profileBtn {
    text-align: center;
    cursor: pointer;
    width: 100%;
    font-size: 18px;
    border: none;
    outline: 0;
    display: inline-block;
    padding: 8px;
    color: white;
    background-color: #3AAFA9;
  }

  .profileBtn:hover, .profileLink:hover {
    opacity: 0.5;
  }

  .imageContainer {
    position: relative;
    width: 100%;
  }

  .image {
    display: block;
    width: 100%;
  }

  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    opacity: 0.3;
    transition: .5s ease;
  }

  .imageContainer:hover .overlay {
    opacity: 0.7;
    background-color: white;
  }

  .text {
    color: #17252A;
    font-size: 30px;
    font-weight: bold;
    position: absolute;
    opacity: 0.6;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
  }
</style>
