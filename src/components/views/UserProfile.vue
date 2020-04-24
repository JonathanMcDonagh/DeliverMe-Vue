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
        <img :src="photo" alt="Profile Image" style="width:100%">
        <h1>{{name}}</h1>
        <p class="useremail">{{email}}</p>
        <p class="useremail">Registered User For DeliverMe</p>
        <p class="useremail">Logged In Using {{platform}}</p>

        <p><button>View My Jobs</button></p>
      </div>
    </div>

    <!-- Bottom Banner and Footer Components -->
    <Banner></Banner>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../views/Footer'
import Banner from './BannerUser'

import firebase from 'firebase'
export default {
  data () {
    return {
      messagetitle: ' My Account ',
      photo: '',
      userId: '',
      name: '',
      email: '',
      platform: '',
      user: {}
    }
  },
  // Gets Components
  components: {
    'Banner': Banner,
    'Footer': Footer
  },
  // Gets user information
  created () {
    var loggedUser = this
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        loggedUser.user = user
        loggedUser.name = loggedUser.user.displayName
        loggedUser.email = loggedUser.user.email
        loggedUser.photo = loggedUser.user.photoURL
        loggedUser.userId = loggedUser.user.uid
        loggedUser.platform = loggedUser.user.providerId
      }
    })
    this.user = firebase.auth().currentUser || false
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

  .useremail {
    color: grey;
    font-size: 18px;
  }

  button {
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

  button:hover, a:hover {
    opacity: 0.5;
  }
</style>
