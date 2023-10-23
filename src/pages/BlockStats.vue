<template>
  <v-container>
    <primary-card>
      <template v-slot:pretitle>Block</template>
      <template v-slot:title>{{ $route.params.id }}</template>
    </primary-card>
    <transactions-table
      v-if="prettiedBlockTransactions.length > 0"
      :tableContent="prettiedBlockTransactions"
    ></transactions-table>
  </v-container>
</template>

<script>
import PrimaryCard from "@/components/PrimaryCard.vue";
import TransactionsTable from "@/components/transactionsTable/TransactionsTable.vue";
import { makeApiRequest } from "../assets/js/apiRequest";
import { makeTransactionsPrettied } from "@/assets/js/transactionsPrettier";

export default {
  components: {
    TransactionsTable,
    PrimaryCard,
  },

  data: () => ({
    currentBlockID: "",
    prettiedBlockTransactions: [],
    queryPage: 0,
  }),

  methods: {
    async prepareBlockData() {
      // TODO: Придумать решение в случае если запрос сработал неверно. Возможно нужно отобразить блок "try again or later"
      // Clear array before fill it with new data
      this.prettiedBlockTransactions.splice(
        0,
        this.prettiedBlockTransactions.length
      );

      const rawBlockTranactions = await this.getRawBlockTransactons();
      if (rawBlockTranactions) {
        this.prettiedBlockTransactions.push(
          ...makeTransactionsPrettied(
            rawBlockTranactions.items,
            this.currentBlockID
          )
        );
      }
    },

    async getRawBlockTransactons() {
      const url = `/block/${this.$route.params.id}/transactions_v3/`;
      try {
        return await makeApiRequest(this.$axios, url, {
          "block-signed-at-asc": true,
        });
      } catch (error) {
        console.error(error);
      }
    },
  },

  mounted() {
    this.currentBlockID = this.$route.params.id;
    this.prepareBlockData();
  },

  watch: {
    "$route.params.id": {
      handler: function () {
        this.currentBlockID = this.$route.params.id;
        this.prepareBlockData();
      },
      deep: true,
      immediate: false,
    },
  },
};
</script>

<style>
</style>