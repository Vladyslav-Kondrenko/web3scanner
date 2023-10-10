<template>
  <transaction-table :transactionInfo="transactionInfo"></transaction-table>
  <pre>

    {{ rawTransaction }}
  </pre>
</template>

<script>
import TransactionTable from "@/components/TransactionTable.vue";
import Web3 from "web3";
import dateFormat from "dateformat";


export default {
  components: {
    TransactionTable,
  },

  data: () => ({
    transactionHash: "",
    rawTransaction: [],
    transactionInfo: {
      blockSignedAt: "",
      blockHeight: "",
      fromAddress: "",
      toAddress: "",
      value: "",
      gasMetadata: {
        offered: "",
        spend: "",
        refunds: "",
        price: "",
        contractTicketSymbol: "",
      },
    },
  }),

  methods: {
    async getTransactionInfoByHash(hash) {
      const url = `/transaction_v2/${hash}/`;

      this.$axios
        .get(url)
        .then((response) => {
          console.log(response.data);
          this.rawTransaction = response.data.data.items;
          let transactionInfo = response.data.data.items[0];

          this.transactionInfo.blockHeight = transactionInfo["block_height"];
          this.transactionInfo.blockSignedAt = dateFormat(transactionInfo["block_signed_at"]);
          this.transactionInfo.fromAddress = transactionInfo["from_address"];
          this.transactionInfo.toAddress = transactionInfo["to_address"];
          this.transactionInfo.value = Web3.utils.fromWei(transactionInfo["value"], 'ether');
          this.transactionInfo.gasMetadata.price = transactionInfo["gas_price"];
          this.transactionInfo.gasMetadata.contractTicketSymbol =
            transactionInfo.gas_metadata.contract_ticker_symbol;
          // default spend & offered walue is in wei, thats why we have to convert it to ether
          this.transactionInfo.gasMetadata.spend = Web3.utils.fromWei(
            transactionInfo["gas_spent"] * this.transactionInfo.gasMetadata.price,
            "ether"
          );
          this.transactionInfo.gasMetadata.offered = Web3.utils.fromWei(
            transactionInfo["gas_offered"] * this.transactionInfo.gasMetadata.price,
            "ether"
          );
          this.transactionInfo.gasMetadata.refunds =
            this.transactionInfo.gasMetadata.offered - this.transactionInfo.gasMetadata.spend;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },

  mounted() {
    this.transactionHash = this.$route.params.hash;
    this.getTransactionInfoByHash(this.transactionHash);
  },

  watch: {
    "$route.params.hash": {
      handler: function () {
        this.getTransactionInfoByHash(this.transactionHash);
      },
    },
  },
};
</script>

<style>
</style>