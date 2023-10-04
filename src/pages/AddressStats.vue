<template>
  <p>address: {{ walletAddress }}</p>

  <transactions-table
    v-if="prettiedAccountTransactions.length > 0"
    :tableContent="prettiedAccountTransactions"
  ></transactions-table>
</template>

<script>
import TransactionsTable from "@/components/transactionsTable/TransactionsTable.vue";
import dateFormat from "dateformat";
import { makeApiRequest } from "../assets/js/apiRequest";

export default {
  components: {
    TransactionsTable,
  },

  data: () => ({
    walletAddress: '',
    prettiedAccountTransactions: [],
    accountBalace: [],
    // v-data-table-server
    queryPage: 0,
  }),

  methods: {
    async prepareAddresssData() {
      // TODO: Придумать решение в случае если запрос сработал неверно. Возможно нужно отобразить блок "try again or later"
      // Clear array before fill it with new data
      this.prettiedAccountTransactions.splice(0, this.prettiedAccountTransactions.length);
      
      const rawAccountTranactions = await this.getRawAccountTransactons();
      console.log('rawAccountTranactions', rawAccountTranactions)
      if (rawAccountTranactions) {
        console.log(this.prettiedAccountTransactions);
        this.prettiedAccountTransactions.push(
          ...this.makeTransactionsPrettied(rawAccountTranactions)
        );
        this.accountBalace = await this.getRawAccountBalance();
        console.log(this.accountBalace);
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

    makeTransactionsPrettied(rawTransactions) {
      let prettiedTransactions = [];

      rawTransactions.forEach((rawTransaction) => {
        prettiedTransactions.push(this.transactionPrettier(rawTransaction));
      });

      return prettiedTransactions;
    },

    transactionPrettier(rawTransaction) {
      let successful = String(rawTransaction["successful"]);
      let block_signed_at = new Date(rawTransaction["block_signed_at"]);
      block_signed_at = dateFormat(block_signed_at, 'yyyy-mm-dd HH:MM:ss');
      let block_height = String(rawTransaction["block_height"]);
      let tx_hash = rawTransaction["tx_hash"];
      let from_address = rawTransaction["from_address"];
      let to_address = rawTransaction["to_address"];
      let pretty_gas_quote = rawTransaction["pretty_gas_quote"];
      let pretty_value_quote = rawTransaction["pretty_value_quote"];

      const prettiedTransaction = {
        successful: {
          text: successful,
        },
        block_signed_at: {
          text: block_signed_at,
        },
        block_height: {
          text: block_height,
          routerLinkUrl: "/block/" + block_height,
        },
        tx_hash: {
          text: this.sliceTransaction(tx_hash),
          routerLinkUrl: "/transaction/" + tx_hash,
        },
        from_address: {
          text: this.sliceTransaction(from_address),
          routerLinkUrl:
            this.walletAddress !== from_address
              ? "/address/" + from_address
              : "",
        },
        to_address: {
          text: this.sliceTransaction(to_address),
          routerLinkUrl:
            this.walletAddress !== to_address ? "/address/" + to_address : "",
        },
        pretty_gas_quote: {
          text: pretty_gas_quote,
        },
        pretty_value_quote: {
          text: pretty_value_quote,
        },
      };

      return prettiedTransaction;
    },

    sliceTransaction(transaction) {
      return !transaction || transaction.length < 8 ? transaction : transaction.slice(0, 4) + "..." + transaction.slice(-4);
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