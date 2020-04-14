<template>
  <div class="hero">
    <div class="container-fluid home-main align-center">
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

    <Banner></Banner>
    <Footer></Footer>
  </div>
</template>

<script>
import Banner from '../views/Banner'
import Footer from '../views/Footer'

export default {
  // Request Job Form
  components: {
    'Banner': Banner,
    'Footer': Footer
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
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: 0!important;
  }
  .hero .lead {
    font-weight: 200;
    font-size: 2.5rem;
  }
  .home-main{
    background-image: url("https://firebasestorage.googleapis.com/v0/b/deliverme-wit.appspot.com/o/topbanner.jpg?alt=media&token=e6c281b0-f1e9-49b1-8733-1c66b0c7d59e");
    background-size: cover;
    background-repeat: no-repeat;
    color:#fff;
    padding: 14.5% ;
    margin: 0;
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
    background:#2B7A78;
  }
  .content1-right{
    padding:9%;
    background:#17252A;
  }
  #app > div.hero > div.container-fluid.home-content1 > div > div.col-lg-6.col-md-12.col-sm-12.content1-left > p, #app > div.hero > div.container-fluid.home-content1 > div > div.col-lg-6.col-md-12.col-sm-12.content1-left > h3 {
    color:#def2f1;
  }
  #app > div.hero > div.container-fluid.home-content1 > div > div.col-lg-6.col-md-12.col-sm-12.content1-right > h3, #app > div.hero > div.container-fluid.home-content1 > div > div.col-lg-6.col-md-12.col-sm-12.content1-right > p {
    color: #def2f1;
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
  .homePageText {
    font-size: 20px;
  }
  @media only screen and (max-width: 1024px) {
    .home-main{
      background-image: url("https://firebasestorage.googleapis.com/v0/b/deliverme-wit.appspot.com/o/topbanner.jpg?alt=media&token=e6c281b0-f1e9-49b1-8733-1c66b0c7d59e");
      background-size: cover;
      background-repeat: no-repeat;
      color:#fff;
      padding: 15%;
      text-align: center;
      margin-top: 60px;
    }
  }
  @media only screen and (max-width: 768px) {
    .home-main{
      background-image: url("https://firebasestorage.googleapis.com/v0/b/deliverme-wit.appspot.com/o/topbanner.jpg?alt=media&token=e6c281b0-f1e9-49b1-8733-1c66b0c7d59e");
      background-size: cover;
      background-repeat: no-repeat;
      color:#fff;
      padding: 15%;
      text-align: center;
      margin-top: 70px;
    }
    #app > div > div.hero-image > div > h1 {
      font-size: 30px;
    }
  }
  @media only screen and (max-width: 375px) {
    .home-main{
      background-image: url("https://firebasestorage.googleapis.com/v0/b/deliverme-wit.appspot.com/o/topbanner.jpg?alt=media&token=e6c281b0-f1e9-49b1-8733-1c66b0c7d59e");
      background-size: cover;
      background-repeat: no-repeat;
      color:#fff;
      padding: 30%;
      text-align: center;
      margin-top: 75px;
    }
    #app > div > div.hero-image > div > h1 {
      font-size: 25px;
    }

  }
</style>
