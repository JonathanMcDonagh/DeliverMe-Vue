<template>
  <!-- Banner For User -->
  <div class="hero-image">
    <div class="hero-text">
      <h1>In need of some extra cash? Become a driver for DeliverMe today</h1>
      <button class="btn btn-primary btn1">Register Now</button>
    </div>
  </div>

</template>

<script>
export default {
  name: 'pagebanner'
}
</script>

<style scoped>
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

</style>
