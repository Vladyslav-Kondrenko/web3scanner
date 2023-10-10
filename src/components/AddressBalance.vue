<template>
  <p>balance</p>
  <p class="balance__total">
    {{ calculateTotalBalance }}
  </p>
  <ul v-if="accountBalanceData.length > 0" class="balance__list">
    <li
      v-for="(balanceItem, index) in accountBalanceData"
      class="balance__item"
      :key="index"
    >
      <img
        :src="balanceItem.logo_url"
        :alt="balanceItem.contranct_name"
        width="24"
        height="24"
      />
      <p class="balance__item-name">
        {{ balanceItem.contract_name }} (
        {{ balanceItem.contract_ticker_symbol }} )
      </p>
      <p class="balance__item-quote">{{ balanceItem.pretty_quote }}</p>
    </li>
  </ul>
  <pre>
    {{ accountBalanceData }}
</pre
  >
</template>

<script>
import { makeApiRequest } from "../assets/js/apiRequest";

export default {
  data: () => ({
    walletAddress: "",
    accountBalanceData: [],
  }),
  methods: {
    async prepareAccountBalanceData() {
      this.accountBalanceData.splice(0);

      const rawAccountData = await this.getRawAccountBalanceData();

      if (rawAccountData) {
        this.makeBalancePrettier(rawAccountData);
      }
    },

    async getRawAccountBalanceData() {
      const url = `/address/${this.walletAddress}/balances_v2/`;
      const queryParams = {
        "no-spam": true,
      };
      try {
        return await makeApiRequest(this.$axios, url, queryParams);
      } catch (error) {
        console.error(error);
      }
    },

    makeBalancePrettier(rawAccountData) {
      this.accountBalanceData = rawAccountData;
      rawAccountData.forEach((balanceElement) => {
        if (balanceElement.pretty_quote === 0) {
          return;
        }
      });
    },
  },

  mounted() {
    this.walletAddress = this.$route.params.wallet;
    this.prepareAccountBalanceData();
  },

  watch: {
    "$route.params.wallet": {
      handler: function () {
        this.walletAddress = this.$route.params.wallet;
        this.prepareAccountBalanceData();
      },
      deep: true,
      immediate: false,
    },
  },

  computed: {
    calculateTotalBalance() {
      return this.accountBalanceData.reduce(function (a, b) {
        return a + b.quote;
      }, 0);
    },
  },
};
</script>

<style>
</style>