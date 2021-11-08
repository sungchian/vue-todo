<template>
  <div class="city-menu">
      <div class="container">
      <div class="row">
    <div class="col-md-4">
      <div class="mb-3">
        <label for="cityName" class="form-label">選擇城市</label>
        <select
          class="form-select"
          id="cityName"
          aria-label="選擇城市"
          v-model="searchCity"
        >
          <option v-for="c in chooseCity" :key="c.cityEng" :value="c.cityEng">{{
            c.city
          }}</option>
        </select>
      </div>
    </div>
    <div class="col-md-8">
      <div class="mb-3">
        <label for="bikeRoute" class="form-label">選擇自行車道</label>
        <select
          class="form-select"
          id="bikeRoute"
          aria-label="選擇自行車道下拉選單"
          v-model="searchCityRoute"
          @change="displayRoute()"
        >
          <option v-for="(r, index) in chooseRoute" :key="index" :value="index">{{ index }} - {{ r.RouteName }}</option>
        </select>
      </div>
    </div>
      </div></div>
  </div>
</template>

<script>
import store from "../store";

export default {
  name: "cityMenu",
  data() {
    return {
      searchCity: '',
      searchCityRoute: '',
      cityName: [
        { city: "臺中市", cityEng: "Taichung" },
        { city: "新竹縣", cityEng: "HsinchuCounty" },
        { city: "基隆市", cityEng: "Keelung" },
        { city: "苗栗縣", cityEng: "MiaoliCounty" },
        { city: "彰化縣", cityEng: "ChanghuaCounty" },
        { city: "新北市", cityEng: "NewTaipei" },
        { city: "南投縣", cityEng: "NantouCounty" },
        { city: "雲林縣", cityEng: "YunlinCounty" },
        { city: "嘉義縣", cityEng: "ChiayiCounty" },
        { city: "嘉義市", cityEng: "Chiayi" },
        { city: "屏東縣", cityEng: "PingtungCounty" },
        { city: "宜蘭縣", cityEng: "YilanCounty" },
        { city: "花蓮縣", cityEng: "HualienCounty" },
        { city: "臺東縣", cityEng: "TaitungCounty" },
        { city: "金門縣", cityEng: "KinmenCounty" },
        { city: "澎湖縣", cityEng: "PenghuCounty" },
        { city: "桃園市", cityEng: "Taoyuan" },
        { city: "臺北市", cityEng: "Taipei" },
        { city: "高雄市", cityEng: "Kaohsiung" },
        { city: "臺南市", cityEng: "Tainan" }
      ]
    };
  },
  computed: {
    chooseCity: {
      get() {
        return this.$data.cityName;
      },
      set(val) {
        store.commit("SET_CITY", val);
      }
    },
    chooseRoute: {
      get() {
        return store.state.bikeRoute;
      },
      set(val) {
        //會拿到index
        console.log('-----'+val);
        store.commit("SET_BIKEROUTE_TARGETINDEX", val);
      }
    },
  },
  watch : {
    //新增的
      searchCity(val){
        store.dispatch('READ_BIKEROUTE_DATA', val)
      },
      searchCityRoute(val){
        console.log('++++++'+val);
        store.dispatch('READ_BIKETARGET_DATA', val)
        this.$emit('display')
      },
      // '$store.state.bikeRouteTargetIndex'() {
      //     console.log('index change');
      //   store.dispatch('READ_BIKETARGET_DATA')
      // },
  },
  methods: {
      displayRoute() {
          this.$emit('display')
      },
  },
};
</script>
