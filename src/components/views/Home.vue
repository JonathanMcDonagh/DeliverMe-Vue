<template>
  <div class="hero">

  <div class="container-fluid home-main">
    <h2>DeliverMe</h2>
    <button type="button" class="btn btn-default">View Deliveries</button>
  </div>
  <div class="container-fluid home-content1">
    <div class="row">
      <div class="col-md-6 content1-left">
        <h3>What is DeliverMe<span class="blinker">?</span></h3>
        <p>Write About</p>
        <!-- <div class="content1-left"></div> -->
      </div>
      <div class="col-md-6 content1-right">
        <h3>Why use DeliverMe<span class="blinker">?</span></h3>
        <p>Write About</p>
        <button type="button" class="btn btn-default">Register as a driver (STYLE BUTTON)</button>
      </div>
    </div>
  </div>

  </div>
</template>

<style>
  #homePageBG {
    background-repeat: no-repeat;
    background-size: cover;
    padding: 20%;
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

  .home-main{
    background: #3AAFA9;
    color:#fff;
    padding: 13%;
    text-align: center;
  }
  .blinker{
    animation: blinker 1.5s linear infinite;
  }
  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
  .home-main button{
    background: #fff;
    color: #000;
    border-radius: 0;
    font-weight: 700;
    width: 16%;
    height: 50px;
    top: 4%;
    margin-top: 3%;
  }
  .home-main button:hover{
    transition: 1s ease;
    color:#3AAFA9;
    width: 19%;
  }
  .content1-left{
    padding:9%;
  }
  .content1-right{
    padding:9%;
    background:#e4e4e4;
  }
  .home-content2{
    background: #DEF2F1;
    padding: 1.4%;
    text-align: center;
  }
  .home-content2 p{
    font-size: 18px;
    line-height: 50px;
  }
  .home-content2 p span{
    font-weight: 500;
  }

</style>
