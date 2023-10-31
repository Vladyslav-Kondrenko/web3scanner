<template>
  <v-container>
    <primary-card>
      <template v-slot:pretitle>Block</template>
      <template v-slot:title>{{ $route.params.id }}</template>
    </primary-card>
    <transactions-table
      :tableContent="prettiedBlockTransactions"
      :enableSceleton="!isBlockDataLoaded"
    ></transactions-table>
  </v-container>
</template>

<script>
import PrimaryCard from "@/components/PrimaryCard/PrimaryCard.vue";
import TransactionsTable from "@/components/TransactionsTable/TransactionsTable.vue";
import { makeTransactionsPrettied } from "@/assets/js/transactionsPrettier";

import { getBlock } from "@/api/block";

export default {
  components: {
    TransactionsTable,
    PrimaryCard,
  },

  data: () => ({
    currentBlockID: "",
    prettiedBlockTransactions: [],
    isBlockDataLoaded: false,
  }),

  methods: {
    async prepareBlockData() {
      // Clear array before fill it with new data
      this.prettiedBlockTransactions.splice(0);

      const rawBlockTranactions = await this.getRawBlockTransactons();
      if (rawBlockTranactions) {
        this.prettiedBlockTransactions.push(
          ...makeTransactionsPrettied(
            rawBlockTranactions.items,
            this.currentBlockID
          )
        );
      }
      this.isBlockDataLoaded = true;
    },

    async getRawBlockTransactons() {
      const params = {
        "block-signed-at-asc": true,
      };
      try {
        return await getBlock(this.$axios, this.$route.params.id, params);
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