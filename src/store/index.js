import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import LocalStorage from "../modules/LocalStorage";
import jsSHA from "jssha";

Vue.use(Vuex);

const STORE = LocalStorage("todo-vue");
// const STORE = new LocalStorage('todo-vue')
//上下兩行是一樣的

//因為是讀localStorage的資料所以要再console.log打上
//window.localStorage.setItem('todo-vue', JSON.stringify([{ content: 123, done: false }, { content: 456, done: true }, { content: 789, done: false }]))
//可用$vm0.$store.dispatch('READ_TODOS').then((res) => {console.log(res)})
//找尋有沒有成功輸入
export default new Vuex.Store({
  state: {
    // todos: [{ content: 123, done: false }, { content: 456, done: true }, { content: 789, done: false }]
    todos: [],
    position: {
      longitude: 0,
      latitude: 0
    },
    authorization: "",
    cityData: "",
    bikeRoute: [],
    bikeStation: [],
    bikeRouteTargetIndex: [],
    bikeRouteTarget: []
  },
  getters: {
    list(state) {
      return state.todos.map((todo, tId) => {
        return {
          tId,
          todo
        };
      });
    },
    filterList(state, getters) {
      return filter => {
        let status = null;
        switch (filter) {
          case "all":
            return getters.list;
          case "active":
            status = false;
            break;
          case "done":
            status = true;
            break;
        }
        return getters.list.filter(todo => {
          return todo.todo.done === status;
        });
      };
    }
    // filterList1 (state) {
    //   return (filter) => {

    //   }
    // },
    // filterList2: (state) => (filter) => {

    // }
    // currDistrictInfo(state) {
    //   // 目前所選行政區
    //   return (
    //     state.cityData
    //   );
    // }
  },
  mutations: {
    SET_TODOS(state, todos) {
      console.log(todos);
      state.todos = todos;
    },
    SET_POSITION(state, payload) {
      state.position.latitude = payload.latitude;
      state.position.longitude = payload.longitude;
    },
    SET_CITY(state, payload) {
      state.cityData = payload;
    },
    SET_STATION_DATA(state, payload) {
      state.bikeStation = payload;
    },
    SET_BIKEROUTE_DATA(state, payload) {
      state.bikeRoute = payload;
    },
    SET_BIKEROUTE_TARGETINDEX(state, payload) {
      state.bikeRouteTargetIndex = payload;
    },
    SET_BIKEROUTE_TARGET(state, payload) {
      console.log(payload);
      state.bikeRouteTarget = payload;
    },
    GetAuthorizationHeader(state) {
      var AppID = "8cea3de491134a68bcafe72fa21e5993";
      var AppKey = "If3Vm6AAeV8uTS4jzYw1EbOl-94";

      var GMTString = new Date().toGMTString();
      var ShaObj = new jsSHA("SHA-1", "TEXT");
      ShaObj.setHMACKey(AppKey, "TEXT");
      ShaObj.update("x-date: " + GMTString);
      var HMAC = ShaObj.getHMAC("B64");
      var Authorization =
        'hmac username="' +
        AppID +
        '", algorithm="hmac-sha1", headers="x-date", signature="' +
        HMAC +
        '"';
      return (state.authorization = {
        Authorization: Authorization,
        "X-Date": GMTString /*,'Accept-Encoding': 'gzip'*/
      }); //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
    }
  },
  actions: {
    CREATE_TODO({ commit }, { todo }) {
      // 1. POST // axios.post()
      const todos = STORE.load();
      todos.push(todo);
      STORE.save(todos);
      // 2. commit mutation
      commit("SET_TODOS", todos);
      // 3. return
      return {
        tId: todos.length - 1,
        todo
      };
    },
    READ_TODOS({ commit }) {
      // 1. GET
      const todos = STORE.load();
      // 2. commit mutation
      commit("SET_TODOS", todos);
      // 3. return
      return {
        todos
      };
    },
    // UPDATE_TODO ({ commit }, { tId, todo }) {
    UPDATE_TODO({ commit, state }, { tId, content }) {
      // 1. PATCH axios.patch()
      //下面這行意思是如果沒改動就直接return
      if (state.todos[tId].content === content) return;
      console.log("API is running...");
      const todos = STORE.load();
      // todos.splice(tId, 1, todo)
      todos[tId].content = content;
      STORE.save(todos);
      // 2. commit mutation
      commit("SET_TODOS", todos);
      // 3. return
      return {
        tId,
        todo: todos[tId]
      };
    },
    CHECK_TODO({ commit }, { tId, done }) {
      // UPDATE_TODO ({ commit }, { tId, content }) {
      // 1. PATCH axios.patch()
      const todos = STORE.load();
      todos[tId].done = done;
      // todos[tId].content = content
      STORE.save(todos);
      // 2. commit mutation
      commit("SET_TODOS", todos);
      // 3. return
      return {
        tId,
        todo: todos[tId]
      };
    },
    DELETE_TODO({ commit }, { tId }) {
      // 1. DELETE axios.delete()
      const todos = STORE.load();
      const todo = todos.splice(tId, 1)[0];
      STORE.save(todos);
      // 2. commit mutation
      commit("SET_TODOS", todos);
      // 3. return
      return {
        tId: null,
        todo
      };
    },
    CLEAR_TODOS({ commit }) {
      const todos = [];
      STORE.save(todos);
      commit("SET_TODOS", todos);
      return {
        todos
      };
    },
    //
    READ_POSITION({ commit }) {
      // 1. GET
      navigator.geolocation.getCurrentPosition(function(position) {
        const longitude = position.coords.longitude; // 經度
        const latitude = position.coords.latitude; // 緯度
        const pos = { latitude, longitude };
        // 將經緯度當作參數傳給 getData 執行
        // getStationData(longitude, latitude);
        // 2. commit mutation
        console.log(pos);
        commit("SET_POSITION", pos);
      });
    },
    READ_AUTHORIZATION({ commit }) {
      commit("GetAuthorizationHeader");
    },
    READ_STATION_DATA({ commit, state }) {
      axios({
        method: "get",
        url: `https://ptx.transportdata.tw/MOTC/v2/Bike/Station/NearBy?$spatialFilter=nearby(${state.position.latitude},${state.position.longitude},500)`,
        headers: state.authorization
      })
        .then(res => {
          console.log("租借站位資料", res);
          //取得租借站位資料axios
          axios({
            method: "get",
            url: `https://ptx.transportdata.tw/MOTC/v2/Bike/Availability/NearBy?$spatialFilter=nearby(${state.position.latitude},${state.position.longitude},500)`,
            headers: state.authorization
          })
            .then(response => {
              console.log("車位資料", response);
              const availableData = response.data;
              // 比對
              availableData.forEach(availableItem => {
                res.data.forEach(stationItem => {
                  if (availableItem.StationUID === stationItem.StationUID) {
                    availableItem.StationName = stationItem.StationName;
                    availableItem.StationAddress = stationItem.StationAddress;
                    availableItem.StationPosition = stationItem.StationPosition;
                    state.bikeStation.push(availableItem);
                  }
                });
              });
              console.log("filterData", state.bikeStation);

              // setMarker();
              commit("SET_STATION_DATA", response.data);
            })
            .catch(error => console.log("error車位資料", error));
        })
        .catch(err => console.log("error租借站位資料", err));
    },
    READ_BIKEROUTE_DATA({ commit, state }) {
      axios({
        method: "get",
        url: `https://ptx.transportdata.tw/MOTC/v2/Cycling/Shape/${state.cityData}`,
        headers: state.authorization
      })
        .then(res => {
          console.log("自行車的路線", res.data);
          commit("SET_BIKEROUTE_DATA", res.data);
        })
        .catch(err => console.log("error自行車的路線", err));
    },
    //這邊我選擇在做一個
    READ_BIKETARGET_DATA({ commit, state }) {
      commit(
        "SET_BIKEROUTE_TARGET",
        state.bikeRoute[state.bikeRouteTargetIndex]
      );
    }
  }
});
