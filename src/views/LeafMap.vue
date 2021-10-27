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
  <div id="mapid">
    <!-- 初始化地圖設定 -->
    <l-map
      ref="myMap"
      :zoom="zoom"
      :center="center"
      :options="options">
      <!-- 載入圖資 -->
      <l-tile-layer :url="url" :attribution="attribution" />
      
      <!-- 自己所在位置 -->
      <l-marker ref="location" :lat-lng="center">
        <l-popup>
          你的位置
        </l-popup>
      </l-marker>
      <!-- 創建標記點 -->
      <l-marker :lat-lng="item.local" v-for="item in data" :key="item.id">
        <!-- 標記點樣式判斷 -->
        <l-icon
          :icon-url="item.name === '夢時代購物中心'?icon.type.gold:icon.type.black"
          :shadow-url="icon.shadowUrl"
          :icon-size="icon.iconSize"
          :icon-anchor="icon.iconAnchor"
          :popup-anchor="icon.popupAnchor"
          :shadow-size="icon.shadowSize"
        />
        <!-- 彈出視窗 -->
        <l-popup>
          {{ item.name }}
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
import L from 'leaflet'
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from 'vue2-leaflet';
import { Icon } from 'leaflet';

//下面這些是官方提供icon消失的語法
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default {
  name: "App",
  data() {
    return {
      // 模擬資料
      data: [
        { id: 1, name: "夢時代購物中心", local: [22.595153, 120.306923] },
        { id: 2, name: "漢神百貨", local: [22.61942, 120.296386] },
        { id: 3, name: "漢神巨蛋", local: [22.669603, 120.302288] },
        { id: 4, name: "大統百貨", local: [22.630748, 120.318033] }
      ],
      
      zoom: 13,
      center: [22.612961, 120.304167],
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: `© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`,
      options: {
        zoomControl: false
      },
      icon: {
        type: {
          black:
            "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png",
          gold:
            "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png"
        },
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      }
    };
    // data: [
    //     { id: 1, name: "夢時代購物中心", local: [22.595153, 120.306923] },
    //     { id: 2, name: "漢神百貨", local: [22.61942, 120.296386] },
    //     { id: 3, name: "漢神巨蛋", local: [22.669603, 120.302288] },
    //     { id: 4, name: "大統百貨", local: [22.630748, 120.318033] }
    //   ],
    //   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //     url: 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    //     maxZoom: 18,
    //     zoom: 10,
    //     center: [24, 121],
    //     id: 'mapbox/streets-v11',
    //     tileSize: 512,
    //     zoomOffset: -1,
    //     accessToken: 'pk.eyJ1IjoiYm5ibjg3MDgyOSIsImEiOiJjazBkd2ZiamQwYnI3M21vMDJhb2kxd2VnIn0.1gBiw9bt0ItpbuDdDm7MmA',
  },
  mounted() {
    // 等地圖創建後執行
    this.$nextTick(() => {
      // 獲得目前位置
      navigator.geolocation.getCurrentPosition(position => {
        const p = position.coords;
        // 將中心點設為目前的位置
        this.center = [p.latitude, p.longitude];
        // 將目前的位置的標記點彈跳視窗打開
        this.$refs.location.mapObject.openPopup();
      });
    })
  },
  components: {
    'l-map' : LMap,
    "l-tile-layer" : LTileLayer,
    "l-marker" : LMarker,
    "l-popup" : LPopup,
    "l-icon" : LIcon,
  }
}
// Mapbox
// const mymap = L.map('mapid').setView([24, 121], 10);

// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//   maxZoom: 18,
//   id: 'mapbox/streets-v11',
//   tileSize: 512,
//   zoomOffset: -1,
//   accessToken: 'pk.eyJ1IjoiYm5ibjg3MDgyOSIsImEiOiJjazBkd2ZiamQwYnI3M21vMDJhb2kxd2VnIn0.1gBiw9bt0ItpbuDdDm7MmA'
// }).addTo(mymap);


// // 使用 navigator web api 獲取當下位置(經緯度)
// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(
//     function (position) {
//       const longitude = position.coords.longitude;  // 經度
//       const latitude = position.coords.latitude;  // 緯度
//       // console.log(longitude)
//       // console.log(latitude)

//       // 重新設定 view 的位置
//       mymap.setView([latitude, longitude], 13);
//       // 將經緯度當作參數傳給 getData 執行
//       getStationData(longitude, latitude);
//     },
//     // 錯誤訊息
//     function (e) {
//       const msg = e.code;
//       const dd = e.message;
//        console.error(msg)
//        console.error(dd)
//     }
//   )
// }

// // 串接附近的自行車租借站位資料
// let data = [];
// function getStationData(longitude, latitude) {
//   axios({
//     method: 'get',
//     // url: 'https://ptx.transportdata.tw/MOTC/v2/Bike/Station/Kaohsiung',
//     url: `https://ptx.transportdata.tw/MOTC/v2/Bike/Station/NearBy?$spatialFilter=nearby(${latitude},${longitude},500)`,
//     headers: GetAuthorizationHeader()
//   })
//     .then((response) => {
//       console.log('租借站位資料',response)
//       data = response.data;

//       getAvailableData(longitude, latitude);

//     })
//     .catch((error) => console.log('error', error))
// }
// // 串接附近的即時車位資料
// let filterData = [];
// function getAvailableData(longitude, latitude) {
//   axios({
//     method: 'get',
//     // url: 'https://ptx.transportdata.tw/MOTC/v2/Bike/Availability/Kaohsiung',
//     url: `https://ptx.transportdata.tw/MOTC/v2/Bike/Availability/NearBy?$spatialFilter=nearby(${latitude},${longitude},500)`,
//     headers: GetAuthorizationHeader()
//   })
//     .then((response) => {
//       console.log('車位資料',response)
//       const availableData = response.data;
    
//       // 比對
//       availableData.forEach((availableItem) => {
//         data.forEach((stationItem) => {
//           if (availableItem.StationUID === stationItem.StationUID) {
//             availableItem.StationName = stationItem.StationName
//             availableItem.StationAddress = stationItem.StationAddress
//             availableItem.StationPosition = stationItem.StationPosition
//             filterData.push(availableItem)
//           }
//         })
//       })
//       console.log('filterData', filterData)

//       setMarker();

//     })
//     .catch((error) => console.log('error', error))
// }
// // API 驗證用
// function GetAuthorizationHeader() {
//   var AppID = '8cea3de491134a68bcafe72fa21e5993';
//   var AppKey = 'If3Vm6AAeV8uTS4jzYw1EbOl-94';

//   var GMTString = new Date().toGMTString();
//   var ShaObj = new jsSHA('SHA-1', 'TEXT');
//   ShaObj.setHMACKey(AppKey, 'TEXT');
//   ShaObj.update('x-date: ' + GMTString);
//   var HMAC = ShaObj.getHMAC('B64');
//   var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';

//   return { 'Authorization': Authorization, 'X-Date': GMTString /*,'Accept-Encoding': 'gzip'*/ }; //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
// }




// // 標記 icon
// function setMarker() {
//   filterData.forEach((item) => {
//     // console.log(item.StationPosition.PositionLon, item.StationPosition.PositionLat)
//     L.marker([item.StationPosition.PositionLat, item.StationPosition.PositionLon]).addTo(mymap).bindPopup(
//       `<div class="card">
//             <div class="card-body">
//                 <h5 class="card-title">${item.StationName.Zh_tw}</h5>
//                 <h6 class="card-subtitle mb-2 text-muted">${item.StationAddress.Zh_tw}</h6>
//                 <p class="card-text mb-0">可租借車數：${item.AvailableRentBikes}</p>
//                 <p class="card-text mt-0">可歸還車數：${item.AvailableReturnBikes}</p>
//             </div>
//         </div>`
//     )
//   }) 
// }



// // 選取自行車的路線
// const bikeRoute = document.querySelector('#bikeRoute');
// function getRoutesData() {
//   axios({
//     method: 'get',
//     url: 'https://ptx.transportdata.tw/MOTC/v2/Cycling/Shape/Taichung',
//     headers: GetAuthorizationHeader()
//   })
//     .then((response) => {
//       console.log('自行車的路線',response)
//       const routeData = response.data;

//       let str = '';
//       routeData.forEach((item) => {
//         str += `<option value="${item.RouteName}">${item.RouteName}</option>`
//       })
//       bikeRoute.innerHTML = str;


//       bikeRoute.addEventListener('change', (e) => {
//         const value = e.target.value;
//         // console.log(myLayer);
//         if(myLayer) {
//         //   console.log(myLayer);
//           mymap.removeLayer(myLayer);
//         }
        
//         routeData.forEach((item) => {
//           // console.log(item)
//           if (item.RouteName === value) {
//             geo = item.Geometry;
            
//             // 畫線的方法
//             polyLine(geo);
//           }
//         })
//       })

//     })
//     .catch((error) => console.log('error', error))
// }
// getRoutesData();

// // 畫出自行車的路線
// let myLayer = null;

// function polyLine(geo) {
//   // 建立一個 wkt 的實體
//   const wicket = new Wkt.Wkt();
//   const geojsonFeature = wicket.read(geo).toJson()
//   // 預設樣式
//   // myLayer = L.geoJSON(geojsonFeature).addTo(mymap);

//   const myStyle = {
//     "color": "#ff0000",
//     "weight": 5,
//     "opacity": 0.65
//   };
//   myLayer = L.geoJSON(geojsonFeature, {
//     style: myStyle
//   }).addTo(mymap);


//   myLayer.addData(geojsonFeature);
//   // zoom the map to the layer
//   mymap.fitBounds(myLayer.getBounds());

// }
</script>

<style>
#mapid { height: 80vh; }
</style>
