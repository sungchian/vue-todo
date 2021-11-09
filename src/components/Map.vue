<template>
  <div class="map">
    <cityMenu v-on:display="polyLine()" />
    <button
      type="button"
      class="showMarker btn btn-outline-primary"
      @click.once="setMarker()"
    >
      顯示最近的自行車租借站
    </button>
    <button
      type="button"
      class="showMarker btn btn-outline-warning"
      @click="HSRroute()"
    >
      顯示高鐵路線
    </button>
    <div class="mapid" id="mapid"></div>
  </div>
</template>

<script>
import L from "leaflet";
import store from "../store";
import "leaflet/dist/leaflet.css";
import Wkt from "wicket/wicket-gmap3.js";
import cityMenu from "./cityMenu.vue";

//下列是icon會出不來的解決方案
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

export default {
  components: { cityMenu },
  name: "Map",
  data() {
    return {
      //別的地方用不到map，所以不用丟到vuex
      map: {},
      myLayer: null
    };
  },
  mounted() {
    console.log("map vue mounted ...");
    //初始化地圖
    this.map = L.map("mapid", {
      center: [23.5, 121],
      zoom: 10
    });

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoiYm5ibjg3MDgyOSIsImEiOiJjazBkd2ZiamQwYnI3M21vMDJhb2kxd2VnIn0.1gBiw9bt0ItpbuDdDm7MmA"
      }
    ).addTo(this.map);
    //setTimeout 才能取到經緯度
    setTimeout(() => {
      this.map.panTo(
        new L.LatLng(
          store.state.position.latitude,
          store.state.position.longitude
        )
      );
    }, 100);
  },
  created() {
    console.log("map vue created ...");
  },
  computed: {},
  watch: {
    //watch function name must match the computed function name
  },
  methods: {
    setMarker: function() {
      store.state.bikeStation.forEach(item => {
        L.marker([
          item.StationPosition.PositionLat,
          item.StationPosition.PositionLon
        ])
          .addTo(this.map)
          .bindPopup(
            `<div class="card">
            <div class="card-body">
                <h5 class="card-title">${item.StationName.Zh_tw}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${item.StationAddress.Zh_tw}</h6>
                <p class="card-text mb-0">可租借車數：${item.AvailableRentBikes}</p>
                <p class="card-text mt-0">可歸還車數：${item.AvailableReturnBikes}</p>
            </div>
        </div>`
          );
      });
    },
    polyLine: function() {
      const geometry = store.state.bikeRouteTarget.Geometry;
      const wicket = new Wkt.Wkt();
      const geojsonFeature = wicket.read(geometry).toJson();
      // 預設樣式
      // myLayer = L.geoJSON(geojsonFeature).addTo(mymap);

      //先刪除之前的紀錄
      if (this.myLayer) {
        this.map.removeLayer(this.myLayer);
      }

      const myStyle = {
        color: "#ff0000",
        weight: 5,
        opacity: 0.65
      };
      this.myLayer = L.geoJSON(geojsonFeature, {
        style: myStyle
      }).addTo(this.map);

      this.myLayer.addData(geojsonFeature);
      // zoom the map to the layer
      this.map.fitBounds(this.myLayer.getBounds());
    },
    HSRroute: function() {
      store.dispatch('READ_HSRROUTE_DATA')
      const geometry = store.state.highSpeedRailwayRoute;
      const wicket = new Wkt.Wkt();
      const geojsonFeature = wicket.read(geometry).toJson();
      // 預設樣式
      // myLayer = L.geoJSON(geojsonFeature).addTo(mymap);

      //先刪除之前的紀錄
      if (this.myLayer) {
        this.map.removeLayer(this.myLayer);
      }

      const myStyle = {
        color: "#CA4F0F",
        weight: 5,
        opacity: 0.65
      };
      this.myLayer = L.geoJSON(geojsonFeature, {
        style: myStyle
      }).addTo(this.map);


  
      this.myLayer.addData(geojsonFeature);
      // zoom the map to the layer
      this.map.fitBounds(this.myLayer.getBounds());
    }
  }
};
</script>
