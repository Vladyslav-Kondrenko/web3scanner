<template>
  <v-container>
    Address: {{ this.walletAddress }}

    <!-- <v-card class="mb-4" title="Overview" text="...">
      <v-card-actions>
        <v-btn>Click me</v-btn>
      </v-card-actions>
    </v-card>

    <v-card title="More Info" :text="ethPrice">
      <v-card-actions>
        <v-btn>Click me</v-btn>
      </v-card-actions>
    </v-card> -->

    <scalable-table :tableHeaders="tableHeaders" :tableContent="prettiedAccountTransactions"></scalable-table>

    <pre>
    {{ this.prettiedAccountTransactions }}

    </pre>
  </v-container>
</template>

<script>
import ScalableTable from "@/components/ScalableTable.vue";
import axios from "axios";



export default {
  props: {
    walletAddress: {
      type: String,
      required: true,
      default: "",
    },
  },

  components: {
    ScalableTable
  },

  data: () => ({
    rawAccountTransactions: [],
    prettiedAccountTransactions: [],

    // v-data-table-server
    tableHeaders: [
      {
        title: "successful",
        align: "start",
        sortable: false,
        key: "successful",
      },
      {
        title: "block_signed_at",
        align: "start",
        sortable: false,
        key: "block_signed_at",
      },
      {
        title: "block_height",
        align: "start",
        sortable: false,
        key: "block_height",
      },
      {
        title: "tx_hash",
        align: "start",
        sortable: false,
        key: "tx_hash",
      },
      {
        title: "from_address",
        align: "start",
        sortable: false,
        key: "from_address",
      },
      {
        title: "to_address",
        align: "start",
        sortable: false,
        key: "to_address",
      },
      {
        title: "pretty_gas_quote",
        align: "start",
        sortable: false,
        key: "pretty_gas_quote",
      },
      {
        title: "pretty_value_quote",
        align: "start",
        sortable: false,
        key: "pretty_value_quote",
      },
    ],
    // v-data-table-server

    queryPage: 0,
    queryOffset: 100,
    apiUrl: "https://api.covalenthq.com/v1/zksync-mainnet",
    apiKey: "cqt_rQq96Gct9HMJdTGJwx894JQ88cWP",
    ethPrice: "",
  }),

  methods: {
    async getRawAccountTransactons() {
      const url = `${this.apiUrl}/address/${this.walletAddress}/transactions_v3/page/${this.queryPage}/`;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      };

      axios
        .get(url, { headers })
        .then((response) => {
          console.log(response.data);
          this.rawAccountTransactions = response.data.data.items;

          this.makeTransactionsPrettied(this.rawAccountTransactions);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    makeTransactionsPrettied(rawTransactions){
      rawTransactions.forEach(rawTransaction => {
        this.prettiedAccountTransactions.push(this.transactionPrettier(rawTransaction));
      });

      console.log(this.prettiedAccountTransactions);
    },

    transactionPrettier(rawTransaction) {
      let successful = String(rawTransaction['successful']);
      let block_signed_at = rawTransaction["block_signed_at"];
      let block_height = rawTransaction["block_height"];
      let tx_hash = this.sliceTransaction(rawTransaction["tx_hash"]);
      let from_address = this.sliceTransaction(rawTransaction["from_address"]);
      let to_address = this.sliceTransaction(rawTransaction["to_address"]);
      let pretty_gas_quote = rawTransaction["pretty_gas_quote"];
      let pretty_value_quote = rawTransaction["pretty_value_quote"];

      let prettiedTransaction = {
        successful: successful,
        block_signed_at: block_signed_at,
        block_height: block_height,
        tx_hash: tx_hash,
        from_address: from_address,
        to_address: to_address,
        pretty_gas_quote: pretty_gas_quote,
        pretty_value_quote: pretty_value_quote,
      };

      return prettiedTransaction;
    },

    sliceTransaction(transaction) {
      return transaction.slice(0, 4) + "..." + transaction.slice(-4);
    },
  },

  mounted() {
    this.getRawAccountTransactons();
  },

  watch: {
    walletAddress() {},
  },
};
</script>

<style>
</style>

<!--
Docs ZkSync lite https://docs.zksync.io/api/v0.1/#rest-api
API https://api.zksync.io/api/v0.1/

 -->