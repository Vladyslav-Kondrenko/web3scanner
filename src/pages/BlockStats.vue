<template>
  <p>Block id: {{ $route.params.id }}</p>
  <pre>

    {{ prettiedAccountTransactions }}
  </pre>
</template>

<script>
export default {


  data: () => ({
    walletAddress: "",
    prettiedAccountTransactions: [],

    // v-data-table-server
    tableHeaders: [
      {
        title: "successful",
        key: "successful",
      },
      {
        title: "block_signed_at",
        key: "block_signed_at",
      },
      {
        title: "block_height",
        key: "block_height",
      },
      {
        title: "tx_hash",
        key: "tx_hash",
      },
      {
        title: "from_address",
        key: "from_address",
      },
      {
        title: "to_address",
        key: "to_address",
      },
      {
        title: "pretty_gas_quote",
        key: "pretty_gas_quote",
      },
      {
        title: "pretty_value_quote",
        key: "pretty_value_quote",
      },
    ],

    queryPage: 0,
  }),

  methods: {
    async getRawAccountTransactons() {
      const url = `/block/${this.$route.params.id}/transactions_v3/`;

      this.$axios
        .get(url)
        .then((response) => {
          console.log(response.data);
          let rawAccountTransactions = response.data.data.items;
          console.log(rawAccountTransactions);
          this.prettiedAccountTransactions = rawAccountTransactions;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },

  mounted() {
    this.walletAddress = this.$route.params.wallet;
    this.getRawAccountTransactons();
  },

  watch: {
    "$route.params.wallet": {
      handler: function () {
        this.walletAddress = this.$route.params.wallet;
        this.getRawAccountTransactons();
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style>

</style>