<!--<template>
  <div class="container">
      <div class="row">
        <div class="col-md-4">
          <div class="mb-3">
            <label for="bikeRoute" class="form-label">選擇自行車道</label>
            <select class="form-select" id="bikeRoute" aria-label="選擇自行車道下拉選單">          
            </select>
          </div>
        </div>
        <div class="col-md-12">
          <div id="mapid"></div>
        </div>
      </div>
    </div>
</template> -->

<template>
  <div id="map">
    <button type="button" @click="show = !show">show = {{ show }}</button>
    <CityMenu />
    <Map />
  </div>
</template>

<script>
import "mapbox-gl-leaflet";
import "mapbox-gl/dist/mapbox-gl.css";
import "leaflet/dist/leaflet.css";
import Map from "../components/Map.vue";
import CityMenu from '../components/cityMenu.vue';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
  name: "App",
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoiYm5ibjg3MDgyOSIsImEiOiJjazBkd2ZiamQwYnI3M21vMDJhb2kxd2VnIn0.1gBiw9bt0ItpbuDdDm7MmA", // your access token. Needed if you using Mapbox maps
      show: false,
      mapStyle: "mapbox://styles/mapbox/streets-v11", // your map style
      center: [121.5, 25],
      zoom: 14,
      showPath: true,
      markerCoordinates: [121.5, 25]
    };
  },
  beforeCreate() {
    console.log("leafmap vue beforeCreated ...");
    //先拿到授權才能拿租借站API
    this.$store.dispatch("READ_AUTHORIZATION");
    this.$store.dispatch("READ_POSITION");
    //下面如果沒有setTimeout 位置會取不到
    setTimeout(() => {
      this.$store.dispatch("READ_STATION_DATA");
    }, 100);
  },
  created() {
    console.log("leafmap vue created ...");
  },
  methods: {},
  components: {
    // MglMap,
    // MglGeojsonLayer,
    // MglMarker,
    Map,
    CityMenu,
  }
};
</script>

<style>
#map {
  height: 40vh;
}

#mapid {
  height: 70vh;
}
</style>
