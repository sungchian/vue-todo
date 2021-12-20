<template>
  <div class="container">
    <h1>Record</h1>
    <hr class="mb-20" style="background-color: white" />
    <div class="exp-route mb-20">
      <router-link to="/records" replace>All</router-link>｜
      <router-link to="/records?filter=expenditure" replace>Expenditure</router-link>｜
      <router-link :to="{ name: 'Records', query: { filter: 'revenue' } }" replace>Revenue</router-link>
    </div>
    <hr class="mb-20" style="background-color: white; width: 80%" />
    <div class="record-container">
      <ul class="record-group">
        <Record
          v-for="record of tradeDetail"
          :key="record.tNum + record.transaction.ps"
          :edit="record.tNum === edit"
          :records="record.transaction"
          :class="record.tNum + record.transaction.ps"
          @editRecord="edit = record.tNum"
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
    };
  },
  mounted() {
    this.$store.dispatch('READ_TRANSACTIONS');
  },
  computed: {
    tradeDetail() {
      return this.$store.getters.filtertradeDetail(this.filter).reverse();
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
    //下面兩個參數名稱要跟index.js的名稱一樣!!!
    editCompleteHandler(tNum, transaction) {
      this.edit = null;
      this.$store.dispatch("UPDATE_TRANSACTION", { tNum, transaction });
      
    },
    deleteRecord(tNum) {
        this.$store.dispatch("DELETE_TRANSACTION", {tNum});
    },
  },
  components: {
    Record,
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

.mb-20 {
  margin-bottom: 20px;
}

.mb-50 {
  margin-bottom: 50px;
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
