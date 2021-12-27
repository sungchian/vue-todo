<script>
import { Doughnut } from "vue-chartjs";
import store from "../store";

export default {
  extends: Doughnut,
  data() {
    return {
      chartData: {
        labels: [
          "Food",
          "Normal",
          "Stay",
          "Transport",
          "Entertainment",
          "Medical",
          "Others",
          "Undefined"
        ],
        datasets: [
          {
            borderWidth: 1,
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(233, 80, 10, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(10, 233, 122, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 150, 173, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(100, 100, 100, 1)"
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(233, 80, 10, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(10, 233, 122, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 150, 173, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(100, 100, 100, 0.2)"
            ],
            data: [
              parseInt(store.state.expenditureCost.food),
              parseInt(store.state.expenditureCost.normal),
              parseInt(store.state.expenditureCost.stay),
              parseInt(store.state.expenditureCost.transport),
              parseInt(store.state.expenditureCost.entertainment),
              parseInt(store.state.expenditureCost.medical),
              parseInt(store.state.expenditureCost.eOthers),
              parseInt(store.state.expenditureCost.eUndefined)
            ]
          }
        ]
      },
      options: {
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>
