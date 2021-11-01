<template>
  <div class="mapid" id="mapid"></div>
</template>

<script>
import L from "leaflet";
import axios from "axios";
import jsSHA from "jssha";
import store from "../store";

export default {
  name: "Map",
  data() {
    return {
      //別的地方用不到map，所以不用丟到vuex
      map: {}
    };
  },
  mounted() {
    console.log('map vue mounted ...');
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
    console.log('map vue created ...');
    // this.map.panTo(
    //   new L.LatLng(
    //     store.state.position.latitude,
    //     store.state.position.longitude
    //   )
    // );
  },
  computed: {
    // currDistrictInfo() {
    //   return store.$getters.currDistrictInfo
    // },
  },
  watch: {
    //watch function name must match the computed function name
    setMarker: function() {
      store.state.bikeStation.forEach(item => {
        // console.log(item.StationPosition.PositionLon, item.StationPosition.PositionLat)
        L.marker([
          item.StationPosition.PositionLat,
          item.StationPosition.PositionLon
        ])
          .addTo(mymap)
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
    }
  }
};
</script>
