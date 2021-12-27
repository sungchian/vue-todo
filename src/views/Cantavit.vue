<template>
  <div class="container">
    <h1>Cantavit</h1>
    <hr class="mb-20" style="background-color: white" />
    <!-- !! -->
    <div class="exp-route mb-20">
      <label class="mr-20"
        ><input type="radio" name="" value="expenditure" v-model="type" /><span
          class="round button"
          >Expenditure</span
        ></label
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
          v-for="expenditureType in this.$store.state.expenditureTypes"
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
        <label
          v-for="revenueType in this.$store.state.revenueTypes"
          :key="revenueType.en"
        >
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
        <input
          class="mb-20"
          type="number"
          name="cost"
          v-model="cost"
          oninput="if(value.length > 8)value = value.slice(0, 8)"
          placeholder="花費"
          required
        />
        <div>P.S. :</div>
        <input
          class="mb-20"
          type="text"
          v-model="ps"
          oninput="if(value.length > 11)value = value.slice(0, 11)"
          placeholder="備註"
          required
        />
      </template>
      <template v-else>
        <div>Earn :</div>
        <input
          class="mb-20"
          type="number"
          name="earn"
          v-model="cost"
          oninput="if(value.length > 8)value = value.slice(0, 8)"
          placeholder="收入"
          required
        />
        <div>P.S. :</div>
        <input
          class="mb-20"
          type="text"
          v-model="ps"
          oninput="if(value.length > 11)value = value.slice(0, 11)"
          placeholder="備註"
          required
        />
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
        <current-record
          v-for="record of tradeDetail"
          :key="record.tNum + record.transaction.ps"
          :edit="record.tNum === edit"
          :records="record.transaction"
          @editRecord="edit = record.tNum"
          @editComplete="value => editCompleteHandler(record.tNum, value)"
          @deleteRecord="deleteRecord(record.tNum)"
        ></current-record>
      </ul>
    </div>
  </div>
</template>

<script>
import currentRecord from "../components/currentRecord";
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
      records: [],
      historyRecords: [],
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
      }
    };
  },
  mounted() {
    this.$store.dispatch("READ_TRANSACTIONS");

    for (let i in this.$store.getters.tradeDetail) {
      if (
        this.$store.getters.tradeDetail[i].transaction.type === "expenditure"
      ) {
        switch (this.$store.getters.tradeDetail[i].transaction.category) {
          case "food":
            this.expenditureCost.food += parseInt(this.$store.getters.tradeDetail[i].transaction.cost);
            this.$store.dispatch(
              "COUNT_EXPENDITURE_COST",
              this.expenditureCost
            );
            break;
          case "normal":
            this.expenditureCost.normal += parseInt(this.$store.getters.tradeDetail[i].transaction.cost);
            this.$store.dispatch(
              "COUNT_EXPENDITURE_COST",
              this.expenditureCost
            );
            break;
          case "stay":
            this.expenditureCost.stay += parseInt(this.$store.getters.tradeDetail[i].transaction.cost);
            this.$store.dispatch(
              "COUNT_EXPENDITURE_COST",
              this.expenditureCost
            );
            break;
          case "transport":
            this.expenditureCost.transport += parseInt(this.$store.getters.tradeDetail[i].transaction.cost);
            this.$store.dispatch(
              "COUNT_EXPENDITURE_COST",
              this.expenditureCost
            );
            break;
          case "entertainment":
            this.expenditureCost.entertainment += parseInt(this.$store.getters.tradeDetail[i].transaction.cost);
            this.$store.dispatch(
              "COUNT_EXPENDITURE_COST",
              this.expenditureCost
            );
            break;
          case "medical":
            this.expenditureCost.medical += parseInt(this.$store.getters.tradeDetail[i].transaction.cost);
            this.$store.dispatch(
              "COUNT_EXPENDITURE_COST",
              this.expenditureCost
            );
            break;
          case "e-others":
            this.expenditureCost.eOthers += parseInt(this.$store.getters.tradeDetail[i].transaction.cost);
            this.$store.dispatch(
              "COUNT_EXPENDITURE_COST",
              this.expenditureCost
            );
            break;
          case "e-undefined":
            this.expenditureCost.eUndefined += parseInt(this.$store.getters.tradeDetail[i].transaction.cost);
            this.$store.dispatch(
              "COUNT_EXPENDITURE_COST",
              this.expenditureCost
            );
            break;
          default:
            console.log("wrong");
            break;
        }
      } else if (
        this.$store.getters.tradeDetail[i].transaction.type === "revenue"
      ) {
        this.revenueEarn += parseInt(
          this.$store.getters.tradeDetail[i].transaction.cost
        );
      }
    }
    this.$store.dispatch("COUNT_EXPENDITURE_COST", this.expenditureCost);
    this.$store.dispatch("COUNT_REVENUE_EARN", this.revenueEarn);
  },
  computed: {
    tradeDetail() {
      return this.$store.getters.top5tradeDeatail;
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
      if (this.type === "expenditure" && this.category === "undefined") {
        this.category = "e-undefined";
      } else if (this.type === "revenue" && this.category === "undefined") {
        this.category = "r-undefined";
      }
      this.records.unshift({
        type: this.type,
        date: this.date,
        datetime: new Date().getTime(),
        category: this.category,
        cost: this.cost,
        ps: this.ps
      });

      this.$store.dispatch("CREATE_TRANSACTION", {
        transaction: {
          type: this.type,
          category: this.category,
          cost: this.cost,
          date: this.date,
          datetime: new Date().getTime(),
          ps: this.ps
        }
      });

      if (this.type === "expenditure") {
        switch (this.category) {
          case "food":
            this.expenditureCost.food += parseInt(this.cost);
            this.$store.dispatch(
              "COUNT_EXPENDITURE_COST",
              this.expenditureCost
            );
            break;
          case "normal":
            this.expenditureCost.normal += parseInt(this.cost);
            this.$store.dispatch(
              "COUNT_EXPENDITURE_COST",
              this.expenditureCost
            );
            break;
          case "stay":
            this.expenditureCost.stay += parseInt(this.cost);
            this.$store.dispatch(
              "COUNT_EXPENDITURE_COST",
              this.expenditureCost
            );
            break;
          case "transport":
            this.expenditureCost.transport += parseInt(this.cost);
            this.$store.dispatch(
              "COUNT_EXPENDITURE_COST",
              this.expenditureCost
            );
            break;
          case "entertainment":
            this.expenditureCost.entertainment += parseInt(this.cost);
            this.$store.dispatch(
              "COUNT_EXPENDITURE_COST",
              this.expenditureCost
            );
            break;
          case "medical":
            this.expenditureCost.medical += parseInt(this.cost);
            this.$store.dispatch(
              "COUNT_EXPENDITURE_COST",
              this.expenditureCost
            );
            break;
          case "e-others":
            this.expenditureCost.eOthers += parseInt(this.cost);
            this.$store.dispatch(
              "COUNT_EXPENDITURE_COST",
              this.expenditureCost
            );
            break;
          case "e-undefined":
            this.expenditureCost.eUndefined += parseInt(this.cost);
            this.$store.dispatch(
              "COUNT_EXPENDITURE_COST",
              this.expenditureCost
            );
            break;
          default:
            console.log("wrong");
            break;
        }
      } else if (this.type === "revenue") {
        switch (this.category) {
          case "payment":
            this.revenueEarn.payment += parseInt(this.cost);
            this.$store.dispatch("COUNT_REVENUE_EARN", this.revenueEarn);
            break;
          case "bonus":
            this.revenueEarn.bonus += parseInt(this.cost);
            this.$store.dispatch("COUNT_REVENUE_EARN", this.revenueEarn);
            break;
          case "parttime":
            this.revenueEarn.parttime += parseInt(this.cost);
            this.$store.dispatch("COUNT_REVENUE_EARN", this.revenueEarn);
            break;
          case "invest":
            this.revenueEarn.invest += parseInt(this.cost);
            this.$store.dispatch("COUNT_REVENUE_EARN", this.revenueEarn);
            break;
          case "allowance":
            this.revenueEarn.allowance += parseInt(this.cost);
            this.$store.dispatch("COUNT_REVENUE_EARN", this.revenueEarn);
            break;
          case "r-others":
            this.revenueEarn.rOthers += parseInt(this.cost);
            this.$store.dispatch("COUNT_REVENUE_EARN", this.revenueEarn);
            break;
          case "r-undefined":
            this.revenueEarn.rUndefined += parseInt(this.cost);
            this.$store.dispatch("COUNT_REVENUE_EARN", this.revenueEarn);
            break;
          default:
            console.log("wrong");
            break;
        }
      } else {
        return;
      }

      this.type = "expenditure";
      this.date = moment().format("YYYY-MM-DD");
      this.category = "undefined";
      this.cost = "";
      this.ps = "";

    },
    deleteRecord(tNum) {
      this.$store.dispatch("DELETE_TRANSACTION", { tNum });
    }
  },

  components: {
    currentRecord
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
  border: solid 2px #f18a9b;
  color: var(--gold-light);
  cursor: default;
  user-select: none;
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
  color: rgb(255, 255, 255);
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
  grid-template-columns: 2fr 1.5fr 1.5fr 1.5fr 4fr;
  grid-gap: 20px;
  justify-items: center;
  margin: 10px 0px;
}
</style>
