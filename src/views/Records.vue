<template>
  <div class="container">
    <h1>Record</h1>
    <hr class="mb-20" style="background-color: white" />
    <div class="exp-route mb-20">
      <router-link to="/records" replace>All</router-link>｜
      <router-link to="/records?filter=expenditure" replace
        >Expenditure</router-link
      >｜
      <router-link
        :to="{ name: 'Records', query: { filter: 'revenue' } }"
        replace
        >Revenue</router-link
      >
    </div>
    <hr class="mb-20" style="background-color: white; width: 80%" />
    <div class="record-container">
      <ul class="record-group">
        <li>
          <button class="record-btn">支出 / 收入</button>
          <button class="record-btn">日期</button>
          <button class="record-btn">種類</button>
          <button class="record-btn">金額</button>
          <button class="record-btn">備註</button>
          <button class="record-btn">Edit</button>
          <button class="record-btn">Delete</button>
        </li>
        <li><hr /></li>
        <!-- @editRecord="edit = record.tNum" -->
        <Record
          v-for="record of tradeDetail"
          :key="record.tNum + record.transaction.ps"
          :edit="record.tNum === edit"
          :records="record.transaction"
          :class="record.tNum + record.transaction.ps"
          @editRecord="oldCost => editHandler(record.tNum, oldCost)"
          @editComplete="value => editCompleteHandler(record.tNum, value)"
          @deleteRecord="deleteRecord(record.tNum)"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import Record from "../components/Record";

export default {
  data() {
    return {
      filter: "all", // all,expenditure,revenue
      edit: null,
      oldCost: 0,
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
            this.expenditureCost.food += parseInt(
              this.$store.getters.tradeDetail[i].transaction.cost
            );
            this.$store.dispatch(
              "COUNT_EXPENDITURE_COST",
              this.expenditureCost
            );
            break;
          case "normal":
            this.expenditureCost.normal += parseInt(
              this.$store.getters.tradeDetail[i].transaction.cost
            );
            this.$store.dispatch(
              "COUNT_EXPENDITURE_COST",
              this.expenditureCost
            );
            break;
          case "stay":
            this.expenditureCost.stay += parseInt(
              this.$store.getters.tradeDetail[i].transaction.cost
            );
            this.$store.dispatch(
              "COUNT_EXPENDITURE_COST",
              this.expenditureCost
            );
            break;
          case "transport":
            this.expenditureCost.transport += parseInt(
              this.$store.getters.tradeDetail[i].transaction.cost
            );
            this.$store.dispatch(
              "COUNT_EXPENDITURE_COST",
              this.expenditureCost
            );
            break;
          case "entertainment":
            this.expenditureCost.entertainment += parseInt(
              this.$store.getters.tradeDetail[i].transaction.cost
            );
            this.$store.dispatch(
              "COUNT_EXPENDITURE_COST",
              this.expenditureCost
            );
            break;
          case "medical":
            this.expenditureCost.medical += parseInt(
              this.$store.getters.tradeDetail[i].transaction.cost
            );
            this.$store.dispatch(
              "COUNT_EXPENDITURE_COST",
              this.expenditureCost
            );
            break;
          case "e-others":
            this.expenditureCost.eOthers += parseInt(
              this.$store.getters.tradeDetail[i].transaction.cost
            );
            this.$store.dispatch(
              "COUNT_EXPENDITURE_COST",
              this.expenditureCost
            );
            break;
          case "e-undefined":
            this.expenditureCost.eUndefined += parseInt(
              this.$store.getters.tradeDetail[i].transaction.cost
            );
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
        switch (this.$store.getters.tradeDetail[i].transaction.category) {
          case "payment":
            this.revenueEarn.payment += parseInt(this.$store.getters.tradeDetail[i].transaction.cost);
            this.$store.dispatch("COUNT_REVENUE_EARN", this.revenueEarn);
            break;
          case "bonus":
            this.revenueEarn.bonus += parseInt(this.$store.getters.tradeDetail[i].transaction.cost);
            this.$store.dispatch("COUNT_REVENUE_EARN", this.revenueEarn);
            break;
          case "parttime":
            this.revenueEarn.parttime += parseInt(this.$store.getters.tradeDetail[i].transaction.cost);
            this.$store.dispatch("COUNT_REVENUE_EARN", this.revenueEarn);
            break;
          case "invest":
            this.revenueEarn.invest += parseInt(this.$store.getters.tradeDetail[i].transaction.cost);
            this.$store.dispatch("COUNT_REVENUE_EARN", this.revenueEarn);
            break;
          case "allowance":
            this.revenueEarn.allowance += parseInt(this.$store.getters.tradeDetail[i].transaction.cost);
            this.$store.dispatch("COUNT_REVENUE_EARN", this.revenueEarn);
            break;
          case "r-others":
            this.revenueEarn.rOthers += parseInt(this.$store.getters.tradeDetail[i].transaction.cost);
            this.$store.dispatch("COUNT_REVENUE_EARN", this.revenueEarn);
            break;
          case "r-undefined":
            this.revenueEarn.rUndefined += parseInt(this.$store.getters.tradeDetail[i].transaction.cost);
            this.$store.dispatch("COUNT_REVENUE_EARN", this.revenueEarn);
            break;
          default:
            console.log("wrong");
            break;
        }
      }else{
        alert("system failed");
      }
    }
  },
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
    editHandler(tNum, oldCost) {
      this.edit = tNum;
      this.oldCost = oldCost;
    },
    //下面兩個參數名稱要跟index.js的名稱一樣!!!
    editCompleteHandler(tNum, transaction) {
      console.log(transaction);
      this.edit = null;
      this.$store.dispatch("UPDATE_TRANSACTION", { tNum, transaction });

      if (transaction.editType === "expenditure") {
        switch (transaction.editCategory) {
          case "food":
            this.expenditureCost.food = this.expenditureCost.food - this.oldCost + parseInt(transaction.editCost);
            this.$store.dispatch(
              "COUNT_EXPENDITURE_COST",
              this.expenditureCost
            );
            break;
          case "normal":
            this.expenditureCost.normal = this.expenditureCost.normal - this.oldCost + parseInt(transaction.editCost);
            this.$store.dispatch(
              "COUNT_EXPENDITURE_COST",
              this.expenditureCost
            );
            break;
          case "stay":
            this.expenditureCost.stay = this.expenditureCost.stay - this.oldCost + parseInt(transaction.editCost);
            this.$store.dispatch(
              "COUNT_EXPENDITURE_COST",
              this.expenditureCost
            );
            break;
          case "transport":
            this.expenditureCost.transport = this.expenditureCost.transport - this.oldCost + parseInt(transaction.editCost);
            this.$store.dispatch(
              "COUNT_EXPENDITURE_COST",
              this.expenditureCost
            );
            break;
          case "entertainment":
            this.expenditureCost.entertainment = this.expenditureCost.entertainment - this.oldCost + parseInt(transaction.editCost);
            this.$store.dispatch(
              "COUNT_EXPENDITURE_COST",
              this.expenditureCost
            );
            break;
          case "medical":
            this.expenditureCost.medical = this.expenditureCost.medical - this.oldCost + parseInt(transaction.editCost);
            this.$store.dispatch(
              "COUNT_EXPENDITURE_COST",
              this.expenditureCost
            );
            break;
          case "e-others":
            this.expenditureCost.eOthers = this.expenditureCost.eOthers - this.oldCost + parseInt(transaction.editCost);
            this.$store.dispatch(
              "COUNT_EXPENDITURE_COST",
              this.expenditureCost
            );
            break;
          case "e-undefined":
            this.expenditureCost.eUndefined = this.expenditureCost.eUndefined - this.oldCost + parseInt(transaction.editCost);
            this.$store.dispatch(
              "COUNT_EXPENDITURE_COST",
              this.expenditureCost
            );
            break;
          default:
            console.log("wrong");
            break;
        }
      } else if (transaction.editType === "revenue") {
        switch (transaction.editCategory) {
          case "payment":
            this.revenueEarn.payment = this.revenueEarn.payment - this.oldCost + parseInt(transaction.editCost);
            this.$store.dispatch("COUNT_REVENUE_EARN", this.revenueEarn);
            break;
          case "bonus":
            this.revenueEarn.bonus = this.revenueEarn.bonus - this.oldCost + parseInt(transaction.editCost);
            this.$store.dispatch("COUNT_REVENUE_EARN", this.revenueEarn);
            break;
          case "parttime":
            this.revenueEarn.parttime = this.revenueEarn.parttime - this.oldCost + parseInt(transaction.editCost);
            this.$store.dispatch("COUNT_REVENUE_EARN", this.revenueEarn);
            break;
          case "invest":
            this.revenueEarn.invest = this.revenueEarn.invest - this.oldCost + parseInt(transaction.editCost);
            this.$store.dispatch("COUNT_REVENUE_EARN", this.revenueEarn);
            break;
          case "allowance":
            this.revenueEarn.allowance = this.revenueEarn.allowance - this.oldCost + parseInt(transaction.editCost);
            this.$store.dispatch("COUNT_REVENUE_EARN", this.revenueEarn);
            break;
          case "r-others":
            this.revenueEarn.rOthers = this.revenueEarn.rOthers - this.oldCost + parseInt(transaction.editCost);
            this.$store.dispatch("COUNT_REVENUE_EARN", this.revenueEarn);
            break;
          case "r-undefined":
            this.revenueEarn.rUndefined = this.revenueEarn.rUndefined - this.oldCost + parseInt(transaction.editCost);
            this.$store.dispatch("COUNT_REVENUE_EARN", this.revenueEarn);
            break;
          default:
            console.log("wrong");
            break;
        }
      } else {
        alert("update failed");
        return;
      }
    },
    deleteRecord(tNum) {
      this.$store.dispatch("DELETE_TRANSACTION", { tNum });
    }
  },
  components: {
    Record
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Cherry+Swash:wght@400;700&display=swap");

/* all style */
* {
  margin: 0 auto;
  /* padding: 0; */
  text-decoration: none;
  list-style: none;
  font-family: "Cherry Swash", cursive;
  color: var(--brown-lighter);
  background: var(--bgc);
  border: none;
  transition: ease-in 0.3s;
}

input {
  border-bottom: solid 1px;
}

.block {
  display: flex;
}

.container * {
  text-align: center;
}

.container h1 {
  font-size: 48px;
  font-weight: bold;
  padding: 30px 0px;
  letter-spacing: 10px;
}

.exp-type-group {
  display: flex;
  justify-content: space-around;
  text-align: center;
}

.exp-type-group label {
  width: 100%;
}

.exp-type-group .exp-type {
  cursor: pointer;
  border: solid 2px transparent;
}

.exp-type-group .exp-type:hover {
  color: thistle;
  border-bottom: solid 2px thistle;
}

.exp-submit {
  font-size: 20px;
  padding: 5px;
  border: solid 2px var(--brown-lighter);
  border-radius: 5px;
}
.exp-submit:hover {
  color: white;
}

/* record-style */
.record-container {
  width: 80%;
}

.record-group li {
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 1.5fr 4fr 0.5fr 0.5fr;
  grid-gap: 20px;
  justify-items: center;
  margin: 10px 0px;
}
</style>
