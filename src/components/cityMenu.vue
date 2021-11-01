<template>
  <div class="city-menu">
    <label for="cityName" class="form-label">選擇城市</label>
    <select
      class="form-select"
      id="cityName"
      aria-label="選擇城市"
      v-model="chooseCity"
    >
      <option v-for="c in chooseCity" :key="c.cityEng" :value="c.cityEng">{{ c.city }}</option>
    </select>
  </div>
</template>

<script>
import store from "../store";

export default {
  name: "cityMenu",
  data() {
    return {
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
        return val;
      }
    }
  }
};
</script>
