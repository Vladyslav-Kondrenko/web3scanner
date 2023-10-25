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
import { makeApiRequest } from "../assets/js/apiRequest";

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
      const url = `/transaction_v2/${this.transactionHash}/`;
      try {
        return await makeApiRequest(this.$axios, url);
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

