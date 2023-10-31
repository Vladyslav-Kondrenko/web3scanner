<template>
  <v-container>
    <single-transaction
      v-if="transactionData.length > 0"
      :transactionData="transactionData"
    ></single-transaction>
  </v-container>
</template>
<script>
import SingleTransaction from "@/components/SingleTransaction/SingleTransaction.vue";
import { getTransaction } from "@/api/transaction";

export default {
  components: {
    SingleTransaction,
  },

  data: () => ({
    transactionHash: "",
    transactionData: [],
  }),

  methods: {
    async prepareTransactionData() {
      const rawTransactionData = await this.getTransactionInfoByHash();
      console.log(rawTransactionData);
      if (rawTransactionData) {
        this.transactionData = rawTransactionData.items;
      }
    },

    async getTransactionInfoByHash() {
      try {
        return await getTransaction(this.$axios, this.transactionHash);
      } catch (error) {
        console.error(error);
      }
    },
  },

  mounted() {
    this.transactionHash = this.$route.params.hash;
    this.prepareTransactionData();
  },

  watch: {
    "$route.params.hash": {
      handler: function () {
        this.prepareTransactionData();
      },
      immediate: false,
      deep: true,
    },
  },
};
</script>

<!--
  tnx hash
  Status
  Block
  Timestamp
  log_events
    decoded
      name
      signature
  From
  Value
  Transaction Fee
  Gas Price
-->

<style>
</style>

