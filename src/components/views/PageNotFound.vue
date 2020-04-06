<template>
  <div class="hero">

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
</template>

<script>
export default {
  name: '404 Page',
  data () {
    return {}
  },
  methods: {
    // To Accept jobs
    homePage: function () {
      this.$router.push('/')
    }
  }
}
</script>

<style>
  #homePageBG {
    background-repeat: no-repeat;
    background-size: cover;
    padding: 20%;
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
  #app1 {
    width: 60%;
    margin: 0 auto;
  }
  .vue-title {
    font-size: 50pt;
    margin-bottom: 10px;
    color: #17252A;
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
