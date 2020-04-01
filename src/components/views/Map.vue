<template>
  <div>
    <div>
      <h2 class="vue-title">Popular stores in Waterford</h2>
    </div>
    <br>
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
</template>

<script>
export default {
  name: 'GoogleMap',
  data () {
    return {
      center: { lat: 52.245791, lng: -7.138660 },
      markers: [
        { lat: 52.245350, lng: -7.141736 },
        { lat: 52.245856, lng: -7.137247 },
        { lat: 52.245981, lng: -7.138484 }
      ],
      places: [],
      currentPlace: { lat: 52.245791, lng: -7.138660 }
    }
  }
}
</script>

<style>
  .vue-title {
    margin-top: 100px;
    text-align: center;
    font-size: 30pt;
    margin-bottom: 10px;
  }
  .map {
    margin-bottom: 100px;
  }
</style>
