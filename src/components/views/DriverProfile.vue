<template>
  <div class="hero">
    <h3 class="vue-title">My Account Details</h3>
    <hr>
    <p>Image of the documentation you provided</p>
    <img :src="uploadURL" style='height: 120px'> <br>
    <p>Name: {{fname}} {{lname}}</p>
    <p>Email: {{driverEmail}}</p>
    <hr>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fname: '',
      lname: '',
      driverEmail: '',
      uploadURL: ''
    }
  },
  created () {
    this.loadDriverDetails()
    this.getDriver()
  },
  methods: {
    loadDriverDetails () {
      this.fname = this.$store.state.driver.fname
      this.lname = this.$store.state.driver.lname
      this.driverEmail = this.$store.state.driver.email
      this.uploadURL = this.$store.state.driver.uploadURL
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
</style>
