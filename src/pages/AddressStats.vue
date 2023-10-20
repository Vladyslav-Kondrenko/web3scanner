<template>
  <v-container>
    <div class="address-stats__main-info">
      <primary-card class="">
        <template v-slot:pretitle> Wallet Address </template>
        <template v-slot:title>
          <copy-content
            :content-for-copy="walletAddress"
            :visualContent="slicedWallet"
          >
          </copy-content>
          <favorite-wallet :wallet="walletAddress"></favorite-wallet>
        </template>
      </primary-card>

      <primary-card>
        <template v-slot:pretitle> Balance </template>
        <template v-slot:title>
          {{ calculateTotalBalance }} $
        </template>
      </primary-card>

      <primary-card>
        <template v-slot:pretitle> Tokens </template>
        <template v-slot:content>
          <address-balance
            :accountBalanceData="accountBalanceData"
          ></address-balance>
        </template>
      </primary-card>
    </div>

    <div class="address-stats__donut">
      <donut-chart :accountBalanceData="accountBalanceData"></donut-chart>
    </div>

    <transactions-table
      v-if="prettiedAccountTransactions.length > 0"
      :tableContent="prettiedAccountTransactions"
    ></transactions-table>
  </v-container>
</template>

<script>
import TransactionsTable from "@/components/transactionsTable/TransactionsTable.vue";
import CopyContent from "@/components/copyContent/CopyContent.vue";
import { makeApiRequest } from "../assets/js/apiRequest";
import { makeTransactionsPrettied } from "@/assets/js/transactionsPrettier";
import FavoriteWallet from "@/components/favoritesWallet/FavoriteWallet.vue";
import PrimaryCard from "@/components/PrimaryCard.vue";
import AddressBalance from "@/components/AddressBalance/AddressBalance.vue";
import { sliceTransaction } from "@/helpers/sliceTransaction";
import { makeAmountReadable } from "@/helpers/makeAmountReadable";
import donutChart from "@/components/donutChart.vue";

export default {
  components: {
    TransactionsTable,
    CopyContent,
    FavoriteWallet,
    PrimaryCard,
    AddressBalance,
    donutChart
  },

  data: () => ({
    walletAddress: "",
    prettiedAccountTransactions: [],
    accountBalanceData: [],
    queryPage: 0,

    DONUT_ITEMS_LIMIT: 10,
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

    // --------------- Balance part

    async prepareAccountBalanceData() {
      this.accountBalanceData.splice(0);

      const rawAccountData = await this.getRawAccountBalanceData();

      if (rawAccountData) {
        this.accountBalanceData = this.makeBalancePrettier(rawAccountData);
      }
    },

    async getRawAccountBalanceData() {
      const url = `/address/${this.walletAddress}/balances_v2/`;
      const queryParams = {
        "no-spam": true,
      };
      try {
        return await makeApiRequest(this.$axios, url, queryParams);
      } catch (error) {
        console.error(error);
      }
    },

    makeBalancePrettier(rawAccountData) {
      console.log(rawAccountData);
      return rawAccountData.filter((item) => {
        return (
          item["pretty_quote"] !== "$0.00" && item["pretty_quote"] !== null
        );
      });
    },
  },

  beforeMount() {
    this.walletAddress = this.$route.params.wallet;
    this.prepareAddressData();
    this.prepareAccountBalanceData();
  },

  watch: {
    "$route.params.wallet": {
      handler: function () {
        this.walletAddress = this.$route.params.wallet;
        this.prepareAddressData();
        this.prepareAccountBalanceData();
      },
      deep: true,
      immediate: false,
    },
  },

  computed: {
    calculateTotalBalance() {
      return makeAmountReadable(
        this.accountBalanceData
          .reduce(function (a, b) {
            return a + b.quote;
          }, 0)
          .toFixed(2)
      );
    },

    slicedWallet() {
      return sliceTransaction(this.walletAddress);
    },
  },
};
</script>

<style lang="scss">
.address-stats {
  &__main-info {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
  }

  &__donut {
    width: 100%;

    @media (min-width: 1280px) {
      width: 50%;
    }
  }
}
</style>