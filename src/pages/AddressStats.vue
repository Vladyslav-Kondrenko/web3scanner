<template>
  <p>address: {{ walletAddress }}</p>

  <transactions-table
    v-if="prettiedAccountTransactions.length > 0"
    :tableContent="prettiedAccountTransactions"
  ></transactions-table>
</template>

<script>
import TransactionsTable from "@/components/transactionsTable/TransactionsTable.vue";
import { makeApiRequest } from "../assets/js/apiRequest";
import { makeTransactionsPrettied } from "@/assets/js/transactionsPrettier";
export default {
  components: {
    TransactionsTable,
  },

  data: () => ({
    walletAddress: "",
    prettiedAccountTransactions: [],
    accountBalance: [],
    queryPage: 0,
  }),

  methods: {
    async prepareAddresssData() {
      // TODO: Придумать решение в случае если запрос сработал неверно. Возможно нужно отобразить блок "try again or later"
      // Clear array before fill it with new data
      this.prettiedAccountTransactions.splice(
        0,
        this.prettiedAccountTransactions.length
      );

      const rawAccountTranactions = await this.getRawAccountTransactons();
      if (rawAccountTranactions) {
        this.prettiedAccountTransactions.push(
          ...makeTransactionsPrettied(rawAccountTranactions, this.walletAddress)
        );
        this.accountBalance = await this.getRawAccountBalance();
      }
    },

    async getRawAccountTransactons() {
      const url = `/address/${this.walletAddress}/transactions_v3/page/${this.queryPage}/`;

      try {
        return await makeApiRequest(this.$axios, url);
      } catch (error) {
        console.error(error);
      }
    },

    async getRawAccountBalance() {
      const url = `/address/${this.walletAddress}/balances_v2/`;

      try {
        return await makeApiRequest(this.$axios, url);
      } catch (error) {
        console.error(error);
      }
    },
  },

  mounted() {
    this.walletAddress = this.$route.params.wallet;
    this.prepareAddresssData();
  },

  watch: {
    "$route.params.wallet": {
      handler: function () {
        this.walletAddress = this.$route.params.wallet;
        this.prepareAddresssData();
      },
      deep: true,
      immediate: false,
    },
  },
};
</script>

<style>
</style>