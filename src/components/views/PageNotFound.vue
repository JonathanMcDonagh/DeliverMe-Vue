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
    <div class="error-content">
    <div class="container">
      <div class="row">
        <div class="col-md-12 ">
          <div class="error-text">
            <h1 class="error">404 Error</h1>
            <h4>Sorry, This page Could Not Be Found!</h4>
            <p>Sorry the page you are looking for does not exist, or may have been removed</p>
            <p>
              <button class="btn btn-primary btn1" @click="homePage">Go to the homepage</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
    <Banner></Banner>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../views/Footer'
import Banner from '../views/Banner'

export default {
  name: '404 Page',
  data () {
    return {
      messagetitle: ' 404 Page '
    }
  },
  methods: {
    // To Accept jobs
    homePage: function () {
      this.$router.push('/')
    }
  },
  components: {
    'Banner': Banner,
    'Footer': Footer
  }
}
</script>

<style>
  #app1 {
    width: 100%;
    margin-bottom: 5%;
    margin-top: 5%;
  }
  .hero {
    height: 100vh;
    margin-top: 100px;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .hero .lead {
    font-weight: 200;
    font-size: 2.5rem;
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
  .vue-title {
    font-size: 50pt;
    margin-bottom: 10px;
    color: #17252A;
  }
  .vue-title {
    margin-top: 100px;
    text-align: center;
    font-size: 30pt;
    margin-bottom: 10px;
  }

  .btn-primary {
    background-color: #3AAFA9;
    border-color: #3AAFA9;
    color: #ffffff;
  }
  .btn-primary:hover {
    color: #3AAFA9;
    border: 2px solid #3AAFA9;
    background-color: #ffffff;
  }
  .home-main button{
    background: #fff;
    color: #000;
    font-weight: 700;
    width: 16%;
    height: 50px;
    top: 4%;
    margin-top: 3%;
    border-radius: 1.5rem;
  }
  .btn-primary {
    background-color: #3AAFA9;
    border-color: #3AAFA9;
    border-radius: 1.5rem;
  }
  .btn-primary:hover {
    color: #3AAFA9;
    border: 2px solid #3AAFA9;
    background-color: white;
    border-radius: 1.5rem;
  }

</style>
