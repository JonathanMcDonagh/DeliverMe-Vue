<template>
  <div class="hero">
    <div id="homePageBG">
        <h1 class="vue-title">Deliver Me</h1>
      <button class="btn btn-primary btn1">
      <router-link class="homeRegisterBtn" to="/RegisterAsDriver">Register as a Driver</router-link>
      </button>
    </div>
    </div>
</template>

<style>
  #homePageBG {
    background-repeat: no-repeat;
    background-size: cover;
    padding: 20%;
  }
  .homeRegisterBtn {
    text-decoration: none;
    color: white;
  }
  .homeRegisterBtn:hover {
    text-decoration: none;
    color: #28A745;
  }
  .hero {
    height: 100vh;
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
    color: #28A745;
    font-family: ;
  }

  .btn-primary {
    background-color: #28A745;
    border-color: #28A745;
    color: #ffffff;
  }
  .btn-primary:hover {
    color: #28A745;
    border: 2px solid #28A745;
    background-color: #ffffff;
  }

</style>
