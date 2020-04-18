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
      <div id="map">
        <gmap-map
          :center="center"
          :zoom="14"
          style="width:100%;  height: 400px;"
        >
          <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            @click="center=m.position"
          ></gmap-marker>
        </gmap-map>
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
  data () {
    return {
      messagetitle: 'Places In Your Area',
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 45.508, lng: -73.587 },
      markers: {
        lat: 45.508,
        lng: -73.587
      },
      places: [],
      currentPlace: null
    }
  },
  mounted () {
    this.geolocate()
  },
  components: {
    'Banner': Banner,
    'Footer': Footer
  },
  methods: {
    // Gets the users location
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
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
  }
  .map {
    margin-bottom: 100px;
  }

  #app1 {
    width: 80%;
    margin: 5% auto;
  }
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

</style>
