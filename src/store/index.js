import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
import LocalStorage from "../modules/LocalStorage";
import jsSHA from "jssha";
import moment from "moment";
Vue.use(Vuex);

const STORE = LocalStorage("todo-vue");
const CANTAVIT = new LocalStorage("cantavit");
//上下兩行是一樣的

//因為是讀localStorage的資料所以要再console.log打上
//window.localStorage.setItem('todo-vue', JSON.stringify([{ content: 123, done: false }, { content: 456, done: true }, { content: 789, done: false }]))
//可用$vm0.$store.dispatch('READ_TODOS').then((res) => {console.log(res)})
//找尋有沒有成功輸入

//CREATE TODO
//$vm0.$store.dispatch('CREATE_TODO', {tid:5,todo:{content: 999, done: true}}).then((res) => {console.log(res)})

//CREATE TRANSACTION
//$vm0.$store.dispatch('CREATE_TRANSACTION', {transaction:{type: "revenue", category: "food", cost:1111, date:"2020-12-11", datetime:4545645464, ps:"qqq"}}).then((res) => {console.log(res)})
export default new Vuex.Store({
  state: {
    // todos: [{ content: 123, done: false }, { content: 456, done: true }, { content: 789, done: false }]
    todos: [],
    //#region leafMap
    loading: false,
    position: {
      longitude: 0,
      latitude: 0
    },
    authorization: "",
    bikeRoute: [],
    bikeStation: [],
    bikeRouteTarget: [],
    highSpeedRailwayStation: [],
    highSpeedRailwayRoute: [],
    //#endregion
    //#region Expenses
    transactions: [],
    expenditureTypes: [
      { en: "food", ch: "飲食" },
      { en: "normal", ch: "日常" },
      { en: "stay", ch: "住宿" },
      { en: "transport", ch: "交通" },
      { en: "entertainment", ch: "娛樂" },
      { en: "medical", ch: "醫療" },
      { en: "e-others", ch: "其他" },
      { en: "e-undefined", ch: "未分類" }
    ],
    revenueTypes: [
      { en: "payment", ch: "薪水" },
      { en: "bonus", ch: "獎金" },
      { en: "parttime", ch: "兼職" },
      { en: "invest", ch: "投資" },
      { en: "allowance", ch: "零用錢" },
      { en: "r-others", ch: "其他" },
      { en: "r-undefined", ch: "未分類" }
    ],
    expenditureCost: {
      food: 0,
      normal: 0,
      stay: 0,
      transport: 0,
      entertainment: 0,
      medical: 0,
      eOthers: 0,
      eUndefined: 0
    },
    revenueEarn: {
      payment: 0,
      bonus: 0,
      parttime: 0,
      invest: 0,
      allowance: 0,
      rOthers: 0,
      rUndefined: 0
    },
    costDifference: 0,
  },
  getters: {
    list(state) {
      if(state.todos){
        return state.todos.map((todo, tId) => {
          return {
            tId,
            todo
          };
        });
      }
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
    },
    tradeDetail(state) {
      if(state.transactions){
        return state.transactions.map((transaction, tNum) => {
          return {
            tNum,
            transaction
          };
        });
      }
      
    },
    filtertradeDetail(state, getters) {
      return filter => {
        let types = null;
        switch (filter) {
          case "all":
            return getters.tradeDetail;
          case "expenditure":
            types = "expenditure";
            break;
          case "revenue":
            types = "revenue";
            break;
        }
        return getters.tradeDetail.filter(transaction => {
          return transaction.transaction.type === types;
        });
      };
    },
    top5tradeDeatail(state, getters) {
      if(getters.tradeDetail){
        return getters.tradeDetail.reverse().slice(0, 5); 
      }
    },
  },
  mutations: {
    SET_TODOS(state, todos) {
      console.log(todos);
      state.todos = todos;
    },
    TOGGLE_LOADING(state, isLoading) {
      state.loading = isLoading;
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
    },
    //#region BIKE
    SET_POSITION(state, payload) {
      state.position.latitude = payload.latitude;
      state.position.longitude = payload.longitude;
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
      state.bikeRouteTarget = payload;
    },
    SET_HSRSTATION_DATA(state, payload) {
      state.highSpeedRailwayStation = payload;
    },
    SET_HSRROUTE_DATA(state, payload) {
      state.highSpeedRailwayRoute = payload;
    },
    //#endregion
    //#region EXPENSES
    SET_TRANSACTIONS(state, transactions) {
      state.transactions = transactions;
    },
    //#endregion
    //#region EXPENSES
    SET_ExpenditureCost(state, expenditureCost) {
      console.log(expenditureCost);
      state.expenditureCost = expenditureCost;
    },
    SET_RevenueEarn(state, earn) {
      state.revenueEarn = earn;
    },
    //#endregion
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
    READ_TOGGLE_LOADING({ commit }, isLoading) {
      commit("TOGGLE_LOADING", isLoading);
    },
    //#region LeafMap
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
    READ_BIKEROUTE_DATA({ commit, state }, searchCity) {
      axios({
        method: "get",
        url: `https://ptx.transportdata.tw/MOTC/v2/Cycling/Shape/${searchCity}`,
        headers: state.authorization
      })
        .then(res => {
          console.log("自行車的路線", res.data);
          commit("SET_BIKEROUTE_DATA", res.data);
        })
        .catch(err => console.log("error自行車的路線", err));
    },
    //這邊我選擇在做一個
    READ_BIKETARGET_DATA({ commit, state }, searchCityIndex) {
      commit("SET_BIKEROUTE_TARGET", state.bikeRoute[searchCityIndex]);
    },
    //high speed railway
    READ_HSRSTATION_DATA({ commit, state }) {
      axios({
        method: "get",
        url: `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/Station?$format=JSON`,
        headers: state.authorization
      })
        .then(res => {
          console.log("高鐵站牌", res.data);
          commit("SET_HSRSTATION_DATA", res.data);
        })
        .catch(err => console.log("error高鐵的站牌", err));
    },
    READ_HSRROUTE_DATA({ commit, state }) {
      commit("TOGGLE_LOADING", true);
      setTimeout(() => {
        axios({
          method: "get",
          url: `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/Shape?$format=JSON`,
          headers: state.authorization
        })
          .then(res => {
            console.log("高鐵路線 get...");
            commit("SET_HSRROUTE_DATA", res.data[0].Geometry);
            commit("TOGGLE_LOADING", false);
          })
          .catch(err => console.log("error高鐵的路線", err));
      }, 2000);
    },
    //#endregion
    //#region Expenses
    CREATE_TRANSACTION({ commit }, { transaction }) {
      //下面兩行都可以
      //$vm0.$store.dispatch('CREATE_TRANSACTION', {tNum:5,transaction:{type: "revenue", category: "food", cost:1111, date:"2020-12-11", datetime:4545645464, ps:"qqq"}}).then((res) => {console.log(res)})
      //$vm0.$store.dispatch('CREATE_TRANSACTION', {transaction:{type: "revenue", category: "food", cost:1111, date:"2020-12-11", datetime:4545645464, ps:"qqq"}}).then((res) => {console.log(res)})
      // 1. POST // axios.post()
      const transactions = CANTAVIT.load() || [];
      transactions.push(transaction);
      CANTAVIT.save(transactions);
      // 2. commit mutation
      commit("SET_TRANSACTIONS", transactions);
      // 3. return
      return {
        tNum: transactions.length - 1,
        transaction
      };
    },
    READ_TRANSACTIONS({ commit }) {
      // 1. GET
      const transactions = CANTAVIT.load();
      // 2. commit mutation
      commit("SET_TRANSACTIONS", transactions);
      // 3. return
      return {
        transactions
      };
    },
    UPDATE_TRANSACTION({ commit, state }, { tNum, transaction }) {
      // 1. PATCH axios.patch()
      //下面這行意思是如果沒改動就直接return
      if (
        state.transactions[tNum].type === transaction.editType &&
        state.transactions[tNum].date === transaction.editDate &&
        state.transactions[tNum].category === transaction.editCategory &&
        state.transactions[tNum].cost === transaction.editCost &&
        state.transactions[tNum].ps === transaction.editPs
      ) {
        return;
      }
      const transactions = CANTAVIT.load();
      // todos.splice(tId, 1, todo)
      transactions[tNum].date = transaction.editDate;
      transactions[tNum].type = transaction.editType;
      transactions[tNum].category = transaction.editCategory;
      transactions[tNum].cost = transaction.editCost;
      transactions[tNum].ps = transaction.editPs;
      CANTAVIT.save(transactions);
      // 2. commit mutation
      commit("SET_TRANSACTIONS", transactions);
      // 3. return
      return {
        tNum,
        transaction: transactions[tNum]
      };
    },
    DELETE_TRANSACTION({ commit }, { tNum }) {
      // 1. DELETE axios.delete()
      const transactions = CANTAVIT.load();
      const transaction = transactions.splice(tNum, 1)[0];
      CANTAVIT.save(transactions);
      // 2. commit mutation
      commit("SET_TRANSACTIONS", transactions);
      // 3. return
      return {
        tNum: null,
        transaction
      };
    },
    //#endregion
    COUNT_EXPENDITURE_COST({commit}, expenditureCost) {
      console.log(expenditureCost);
      commit("SET_ExpenditureCost", expenditureCost);
    },
    COUNT_REVENUE_EARN({commit}, revenueEarn) {
      commit("SET_RevenueEarn", revenueEarn);
    },
  }
});
