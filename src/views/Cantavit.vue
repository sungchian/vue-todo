<template>
  <div class="container">
    <h1>Cantavit</h1>
    <hr class="mb-20" style="background-color: white" />
    <!-- !! -->
    <div class="exp-route mb-20">
      <label class="mr-20"
        ><input
          type="radio"
          name=""
          value="expenditure"
          checked="checked"
          v-model="type"
        /><span class="round button">Expenditure</span></label
      >
      |
      <label class="ml-20">
        <input type="radio" name="" value="revenue" v-model="type" />
        <span class="round button">Revenue</span>
      </label>
    </div>
    <!-- !! -->
    <input type="date" class="exp-date block mb-20" v-model="date" />
    <form action="xxx" @submit.prevent="handleSubmit">
      <div class="mb-20">Category :</div>
      <div v-if="type === 'expenditure'" class="exp-types mb-20">
        <label
          v-for="expenditureType in expenditureTypes"
          :key="expenditureType.en"
        >
          <input
            type="radio"
            name=""
            :id="expenditureType.en"
            :value="expenditureType.en"
            v-model="category"
          />
          <span class="round button">{{ expenditureType.ch }}</span>
        </label>
      </div>

      <div v-else class="rev-types mb-20">
        <label v-for="revenueType in revenueTypes" :key="revenueType.en">
          <input
            type="radio"
            name=""
            :id="revenueType.en"
            :value="revenueType.en"
            v-model="category"
          />
          <span class="round button">{{ revenueType.ch }}</span>
        </label>
      </div>

      <template v-if="type === 'expenditure'">
        <div>Cost :</div>
        <input class="mb-20" type="number" name="cost" v-model="cost" />
        <div>P.S. :</div>
        <input class="mb-20" type="text" v-model="ps" />
      </template>
      <template v-else>
        <div>Earn :</div>
        <input class="mb-20" type="number" name="earn" v-model="cost" />
        <div>P.S. :</div>
        <input class="mb-20" type="text" v-model="ps" />
      </template>

      <div v-if="type === 'expenditure'">
        <input class="exp-submit mb-20" type="submit" value="register" />
      </div>
      <div v-else>
        <input class="rev-submit mb-20" type="submit" value="register" />
      </div>
    </form>
    <div class="record-container">
      <h2>Record</h2>
      <hr />
      <ul class="record-group">
        <Record
          v-for="record of historyRecords"
          :key="record.index + record.category"
          :edit="record.index === edit"
          :currentRecord="currentRecord"
          :records="record"
          @check="value => checkHandler(trade.tNum, value)"
          @editRecord="edit = record.index"
          @editComplete="value => editCompleteHandler(trade.tNum, value)"
          @deleteRecord="deleteRecord()"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import Record from "../components/Record";
import typeButton from "../components/typeButton";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
export default {
  data() {
    return {
      type: "expenditure",
      date: moment().format("YYYY-MM-DD"),
      //待修
      category: "undefined",
      cost: "",
      ps: "",
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
      records: [],
      historyRecords: [],
    };
  },
  mounted() {},
  computed: {
    tradeDetail() {
      return this.$store.getters.filtertradeDetail(this.filter);
    }
  },
  watch: {
    $route: {
      //watch在進入網頁預設是不會作用
      immediate: true,
      handler: function(route) {
        this.edit = null;
        // check query => redirect
        this.filter = route.query.filter || "all";
      }
    }
  },
  methods: {
    handleSubmit() {
      this.records.unshift({
        type: this.type,
        date: this.date,
        datetime: new Date().getTime(),
        category: this.category,
        cost: this.cost,
        ps: this.ps
      });

      if (this.historyRecords.length > 4) {
        this.historyRecords.pop();
      }
      this.historyRecords.unshift({
        type: this.type,
        date: this.date,
        datetime: new Date().getTime(),
        category: this.category,
        cost: this.cost,
        ps: this.ps
      });
    }
  },
  components: {
    Record,
    typeButton
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Cherry+Swash:wght@400;700&display=swap");

/* all style */
* {
  margin: 0 auto;
  padding: 0;
  text-decoration: none;
  list-style: none;
  font-family: "Cherry Swash", cursive;
  color: var(--brown-lighter);
  border: none;
  transition: ease-in 0.3s;
}

input {
  border-bottom: solid 1px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}

.block {
  display: flex;
}

.mb-20 {
  margin-bottom: 20px;
}

.mb-50 {
  margin-bottom: 50px;
}

.ml-20 {
  margin-left: 20px;
}

.mr-20 {
  margin-right: 20px;
}

.container {
  background: linear-gradient(
    120deg,
    var(--bgc-left-top),
    var(--bgc-right-down)
  );
}

.container * {
  text-align: center;
}

.container h1 {
  background: linear-gradient(120deg, var(--gold-light), var(--gold));
  background-clip: border-box;
  -webkit-background-clip: text;
  color: transparent;
  font-size: 48px;
  font-weight: bold;
  padding: 30px 0px;
  letter-spacing: 10px;
}

.exp-route input[type="radio"],
.exp-types input[type="radio"],
.rev-types input[type="radio"] {
  display: none;
}
.exp-route input:checked + .button {
  background: #f18a9b;
  border: solid 2px #f18a9b;
  color: var(--gold-light);
  cursor: default;
}
.exp-types input:checked + .button,
.rev-types input:checked + .button {
  /* padding: 25px; */
  border: solid 2px #f18a9b;
  color: var(--gold-light);
  cursor: default;
}

.exp-route .button,
.exp-types .button,
.rev-types .button {
  display: inline-block;
  padding: 5px 10px;
  border: solid 2px transparent;
  color: white;
  cursor: pointer;
}
.exp-route .button:hover,
.exp-types .button:hover,
.rev-types .button:hover {
  background: rgb(102, 102, 102);
  color: #fff;
}
.exp-route .round,
.exp-types .round,
.rev-types .round {
  border-radius: 5px;
}

.exp-types,
.rev-types {
  display: flex;
  justify-content: space-around;
  text-align: center;
}

.exp-submit,
.rev-submit {
  background-image: linear-gradient(
    to right,
    #1f1c2c 0%,
    #928dab 51%,
    #1f1c2c 100%
  );
}
.exp-submit,
.rev-submit {
  margin: 10px;
  padding: 10px 30px;
  text-align: center;
  transition: 1s;
  background-size: 200% auto;
  color: white;
  border-radius: 5px;
}

.exp-submit:hover,
.rev-submit:hover {
  background-position: right center; /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}

/* record-style */
.record-container {
  width: 80%;
  border: solid 2px white;
}

.record-group li {
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 4fr 1fr 0.5fr 0.5fr;
  grid-gap: 20px;
  justify-items: center;
  margin: 10px 0px;
}
</style>
