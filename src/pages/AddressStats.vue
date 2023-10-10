<template>
  <p>address: {{ walletAddress }}</p>

  <address-balance></address-balance>

  <transactions-table
    v-if="prettiedAccountTransactions.length > 0"
    :tableContent="prettiedAccountTransactions"
  ></transactions-table>
</template>

<script>
import TransactionsTable from "@/components/transactionsTable/TransactionsTable.vue";
import AddressBalance from "@/components/AddressBalance.vue";
import { makeApiRequest } from "../assets/js/apiRequest";
import { makeTransactionsPrettied } from "@/assets/js/transactionsPrettier";

export default {
  components: {
    TransactionsTable,
    AddressBalance
  },

  data: () => ({
    walletAddress: "",
    prettiedAccountTransactions: [],
    queryPage: 0,
  }),

  methods: {
    async prepareAddressData() {
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
  },

  mounted() {
    this.walletAddress = this.$route.params.wallet;
    this.prepareAddressData();
  },

  watch: {
    "$route.params.wallet": {
      handler: function () {
        this.walletAddress = this.$route.params.wallet;
        this.prepareAddressData();
      },
      deep: true,
      immediate: false,
    },
  },
};
</script>

<style>
</style>