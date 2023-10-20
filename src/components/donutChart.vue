<template>
  <apexchart
    v-if="getDonutsSeries.length > 0"
    type="donut"
    :options="getChartOptions"
    :series="getDonutsSeries"
  ></apexchart>
</template>

<script>
import { makeAmountReadable } from "@/helpers/makeAmountReadable";

export default {
  data: () => ({
    DONUT_ITEMS_LIMIT: 10,
  }),

  props: {
    accountBalanceData: {
      type: Object,
      required: true,
      default: () => {
        return {};
      },
    },
  },

  computed: {
    getDonutsLabels() {
      let donutLabels = this.accountBalanceData
        .map((item) => item.contract_ticker_symbol)
        .slice(0, this.DONUT_ITEMS_LIMIT);

      donutLabels[donutLabels.length] = "ALL OTHER";
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
            },
          },
        },

        labels: this.getDonutsLabels,
        dataLabels: {},
        tooltip: {
          y: {
            formatter: (seriesName) => "$" + makeAmountReadable(seriesName),
          },
        },
      };
    },
  },
};
</script>

<style>
</style>