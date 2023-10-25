<template>
  <apexchart
    v-if="getDonutsSeries.length > 0"
    type="donut"
    :options="getChartOptions"
    :series="getDonutsSeries"
    ref="donutChart"
  ></apexchart>
</template>

<script>
import { makeAmountReadable } from "@/helpers/makeAmountReadable";

export default {
  data: () => ({
    DONUT_ITEMS_LIMIT: 10,
    activeItemChart: null,
  }),

  props: {
    accountBalanceData: {
      type: Object,
      required: true,
      default: () => {
        return {};
      },
    },
    activeItemIndex: {
      type: [Number, null],
      required: false,
      default: null,
    },
  },

  methods: {
    getChartLabelbyIndex(index) {
      const donutsLables = Object.values(this.getDonutsLabels);

      const label =
        donutsLables.length > index
          ? donutsLables[index]
          : donutsLables[donutsLables.length - 1];
      console.log(label);

      return label;
    },
  },

  computed: {
    getDonutsLabels() {
      let donutLabels = this.accountBalanceData
        .map((item) => item.contract_ticker_symbol)
        .slice(0, this.DONUT_ITEMS_LIMIT);

      donutLabels[donutLabels.length] = "OTHER";
      return donutLabels;
    },

    getDonutsSeries() {
      let donutSeries = this.accountBalanceData.map((item) => {
        return Number(item.pretty_quote.replace(/[^\d.]/g, "")); // remove $ character
      });

      if (donutSeries.length < this.DONUT_ITEMS_LIMIT) {
        return donutSeries;
      }

      let mainDonutSeries = donutSeries.slice(0, this.DONUT_ITEMS_LIMIT);
      let otherDonutSeries = donutSeries
        .slice(this.DONUT_ITEMS_LIMIT)
        .reduce((acc, a) => acc + a, 0)
        .toFixed(2);

      mainDonutSeries[mainDonutSeries.length] = +otherDonutSeries;
      return mainDonutSeries;
    },

    getChartOptions() {
      return {
        chart: {
          type: "donut",
        },
        plotOptions: {
          pie: {
            donut: {
              size: "90%", // Change this value to adjust the thickness (percentage of the pie)
              labels: {
                show: true,
                showAlways: true,
                value: {
                  show: true,
                  fontSize: "16px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 400,
                  color: undefined,
                  offsetY: 16,
                  formatter: function (w) {
                    console.log(w)
                    return (
                      "$" +
                      makeAmountReadable(w)
                    );
                  },
                },

                total: {
                  show: true,
                  showAlways: true,
                  label: "Total",
                  fontSize: "48px",
                  fontWeight: 600,
                  color: "#373d3f",
                  formatter: function (w) {
                    return (
                      "$" +
                      makeAmountReadable(
                        w.globals.seriesTotals
                          .reduce((a, b) => {
                            return a + b;
                          }, 0)
                          .toFixed(2)
                      )
                    );
                  },
                },
              },
            },
          },
          hover: {
            filter: {
              type: "darken",
              value: 0.9,
            },
          },
        },
        legend: {
          show: false,
        },

        labels: this.getDonutsLabels,
        tooltip: {
          y: {
            formatter: (seriesName) => "$" + makeAmountReadable(seriesName),
          },
        },
      };
    },
  },

  watch: {
    activeItemIndex(newValue, oldValue) {
      if (newValue != null) {
        const activeChartLabel = this.getChartLabelbyIndex(newValue);
        this.$refs.donutChart.toggleSeries(activeChartLabel);
        this.activeItemChart = activeChartLabel;
      }

      if (newValue === null) {
        const activeChartLabel = this.getChartLabelbyIndex(oldValue);
        if (this.activeItemChart === activeChartLabel) {
          this.$refs.donutChart.toggleSeries(activeChartLabel);
          this.activeItemChart = null;
        }
      }
    },
  },
};
</script>

<style>
</style>