<template>
  <div class="container">
    <h1 class="analysis-title">Consumption analysis</h1>
    <hr class="mb-20" style="background-color: black" />
    <form class="analysis-time mb-20" @submit.prevent="timeSubmit">
      <h3 class="mb-20">Time Zone</h3>
      <div class="analysis-input mb-20">
        <input type="date" class="analysis-start-time" v-model="startTime"/> ~
        <input type="date" class="analysis-end-time" v-model="endTime"/>
      </div>
      <button class="analysis-submit">Search</button>
    </form>
    <h3 class="mb-20">Expenditure Analysis</h3>
    <!-- 可使用v-if或是v-bind:class -->
    <h4 class="analysis-total total-positive mb-20" v-if="total > 0">
      結餘: +{{ total }}
    </h4>
    <h4 class="analysis-total total-negative mb-20" v-else>
      結餘: {{ total }}
    </h4>
    <div class="exp-group">
      <div class="exp-total">支出總金額: {{ expenditureCostTotal }}</div>
      <doughnut-chart class="exp-chart mb-50"></doughnut-chart>
    </div>
    <h3 class="mb-20">Revenue Analysis</h3>
    <div class="rev-group">
      <div class="rev-total">收入總金額: {{ revenueEarnTotal }}</div>
      <doughnut-chart-2 class="rev-chart mb-50"></doughnut-chart-2>
    </div>
  </div>
</template>

<script>
import DoughnutChart from "../components/DoughnutChart";
import DoughnutChart2 from "../components/DoughnutChart2.vue";

export default {
  data() {
    return {
      total: 0,
      expenditureCostTotal: 0,
      revenueEarnTotal: 0,
      startTime: '2021-12-01',
      endTime: '2021-12-31',
    };
  },
  components: {
    DoughnutChart,
    DoughnutChart2
  },
  mounted() {
    for (let i in this.$store.state.expenditureCost) {
      this.expenditureCostTotal += parseInt(
        this.$store.state.expenditureCost[i]
      );
    }
    for (let j in this.$store.state.revenueEarn) {
      this.revenueEarnTotal += parseInt(this.$store.state.revenueEarn[j]);
    }
    this.total = this.revenueEarnTotal - this.expenditureCostTotal;
  },
  methods: {
    timeSubmit() {
      // index.js 待完成
    },
  },
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
  color: var(--brown);
  background: var(--brown-lighter);
  border: none;
  transition: ease-in 0.3s;
  text-align: center;
}

.mb-20 {
  margin-bottom: 20px;
}

.container h1 {
  font-size: 48px;
  font-weight: bold;
  padding: 30px 0px;
  letter-spacing: 10px;
}

.analysis-submit {
  border: solid 2px black;
}

.total-positive {
  color: green;
}

.total-negative {
  color: red;
}

.analysis-total {
  font-weight: bold;
}

.exp-group,
.rev-group {
  position: relative;
}

.exp-total,
.rev-total {
  position: absolute;
  top: 54%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20px;
  background: none;
}
</style>
