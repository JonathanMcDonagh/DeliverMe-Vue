<template>
  <div class="hero">

  <div class="container-fluid home-main">
  </div>
  <div class="container-fluid home-content1">
    <div class="row">
      <div class="col-lg-6 col-md-12 col-sm-12 content1-left">
        <h3>What is DeliverMe<span class="blinker">?</span></h3>
        <p class="homePageText">DeliverMe is an online delivery service that allows user to pick the
        price of their own delivery, a price they are comfortable paying. The bigger
        the size of the item typically the higher the cost of the delivery.
        A driver can accept a delivery request a user makes which the can then discuss
        further through a phone number</p>
        <!-- <div class="content1-left"></div> -->
      </div>
      <div class="col-lg-6 col-md-12 col-sm-12 content1-right">
        <h3>Why use DeliverMe<span class="blinker">?</span></h3>
        <p class="homePageText">DeliverMe is good for the everyday busy person who may not have the time
        to pick up everyday items such as a small shopping list, laundry or items
        you set as click and collect. But you may want to be a delivery driver which
        you can do with car or bike or even just walk to get it for someone to earn
        some extra cash for possibly Taxi drivers, students or someone who just wants
        to make some extra money</p>
      </div>
    </div>
  </div>

  </div>
</template>

<style>
  .hero {
    height: 100vh;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .hero {
    font-weight: 200;
    font-size: 2.5rem;
  }
  .home-main{
    background-image: url("../../assets/DeliverMeBG.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    color:#fff;
    padding: 15%;
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
    font-weight: 700;
    width: 16%;
    height: 50px;
    top: 4%;
    margin-top: 3%;
    border-radius: 1.5rem;
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
  .home-content2 p{
    font-size: 18px;
    line-height: 50px;
  }
  .home-content2 p span{
    font-weight: 500;
  }

  .homePageText {
    font-size: 20px;
  }

  @media only screen and (max-width: 1024px) {
    .home-main{
      background-image: url("../../assets/DeliverMeBG.jpg");
      background-size: cover;
      background-repeat: no-repeat;
      color:#fff;
      padding: 20%;
      text-align: center;
    }
  }

  @media only screen and (max-width: 768px) {
    .home-main{
      background-image: url("../../assets/DeliverMeBG.jpg");
      background-size: cover;
      background-repeat: no-repeat;
      color:#fff;
      padding: 22%;
      text-align: center;
    }
  }

  @media only screen and (max-width: 375px) {
    .home-main{
      background-image: url("../../assets/DeliverMeBG.jpg");
      background-size: cover;
      background-repeat: no-repeat;
      color:#fff;
      padding: 38%;
      text-align: center;
    }
  }
</style>
