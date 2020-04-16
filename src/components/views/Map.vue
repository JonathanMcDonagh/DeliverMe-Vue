<template>
  <div class="hero">

    <div class="banner-header">
      <div class="row">
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
    </div>

    <div id="app1">
    <div class="map">
      <gmap-map
        :center="center"
        :zoom="17"
        style="width:80%;  height: 400px; margin-left: auto; margin-right: auto"
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
  name: 'GoogleMap',
  data () {
    return {
      messagetitle: ' Popular Stores In Waterford   ',
      center: { lat: 52.245791, lng: -7.138660 },
      markers: [
        { lat: 52.245350, lng: -7.141736 },
        { lat: 52.245856, lng: -7.137247 },
        { lat: 52.245981, lng: -7.138484 }
      ],
      places: [],
      currentPlace: { lat: 52.245791, lng: -7.138660 }
    }
  },
  components: {
    'Banner': Banner,
    'Footer': Footer
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
    width: 100%;
    margin-top: 5%;
  }
  .vue-title {
    margin-top: 125px;
    text-align: center;
    font-size: 30pt;
    margin-bottom: 10px;
    color: #3AAFA9;
  }

  #app1 {
    margin-bottom: 5%;
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
