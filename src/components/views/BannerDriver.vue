<template>
  <div class="hero-image">
    <div class="hero-text">
      <h1>Need a delivery? Sign up as a user today!</h1>
      <button class="btn btn-primary btn1">Sign In</button>
    </div>
  </div>

</template>

<script>
export default {
  name: 'pagebanner'
}
</script>

<style>
  /*
#banner {
  background-color: #3AAFA9;
  background-image: url("../../assets/HomeBG.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 350px;
  margin:0;
  overflow-x: -moz-scrollbars-none;
}

   */

.hero-image {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("../../assets/HomeBG.jpg");
  height: 50%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.hero-text {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
}

.hero-text button {
  background-color: #3AAFA9;
  border-color: #3AAFA9;
  color: #ffffff;
  direction: ltr;
  font-weight: 500;
  height: auto;
  line-height: normal;
  max-width: 220px;
  min-height: 40px;
  padding: 8px 16px;
  text-align: center;
  width: 100%;
}

.hero-text button:hover {
  color: #3AAFA9;
  border: 2px solid #3AAFA9;
  background-color: #ffffff;
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
