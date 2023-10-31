<template>
  <v-container>
    <div class="address-stats__main-wrapper">
      <div class="address-stats__main-info">
        <primary-card class="">
          <template v-slot:pretitle>Address </template>
          <template v-slot:title>
            <copy-content :content-for-copy="walletAddress">
              <template v-slot:content>
                <p>{{ slicedWallet }}</p>
              </template>
            </copy-content>
            <add-to-favorites :wallet="walletAddress"></add-to-favorites>
          </template>
        </primary-card>

        <primary-card>
          <template v-slot:pretitle> Balance </template>
          <template v-slot:title> $ {{ calculateTotalBalance }} </template>
        </primary-card>

        <primary-card
          v-if="
            iswalletBalanceDataLoaded === false ||
            (iswalletBalanceDataLoaded === true &&
              walletBalanceData.length > 0)
          "
        >
          <template v-slot:pretitle> Tokens </template>
          <template v-slot:content>
            <wallet-balance-list
              @activeItemKeyUpdated="showActiveItemOnChart"
              :showComponentSceleton="!iswalletBalanceDataLoaded"
              :walletBalanceData="walletBalanceData"
            ></wallet-balance-list>
          </template>
        </primary-card>
      </div>

      <div class="address-stats__donut">
        <donut-chart
          class="address-stats__donut-content"
          :walletBalanceData="walletBalanceData"
          :activeItemIndex="activeToken"
        ></donut-chart>
      </div>
    </div>

    <transactions-table
      :tableContent="walletTransactionsData"
      :enableSceleton="!isAddressDataLoaded"
    ></transactions-table>
  </v-container>
</template>

<script>
import TransactionsTable from "@/components/TransactionsTable/TransactionsTable.vue";
import CopyContent from "@/components/CopyContent/CopyContent.vue";
import PrimaryCard from "@/components/PrimaryCard/PrimaryCard.vue";
import WalletBalanceList from "@/components/WalletBalanceList/WalletBalanceList.vue";
import AddToFavorites from "@/components/AddToFavorites/AddToFavorites.vue";
import DonutChart from "@/components/DonutChart/donutChart.vue";
import { makeTransactionsPrettied } from "@/assets/js/transactionsPrettier";
import { sliceTransaction } from "@/helpers/sliceTransaction";
import { makeAmountReadable } from "@/helpers/makeAmountReadable";

import { getTransactions } from "@/api/transactions";
import { getBalances } from "@/api/balances";

export default {
  components: {
    TransactionsTable,
    CopyContent,
    AddToFavorites,
    PrimaryCard,
    WalletBalanceList,
    DonutChart,
  },

  data: () => ({
    walletAddress: "",
    walletTransactionsData: [],
    walletBalanceData: [],
    queryPage: 0,
    iswalletBalanceDataLoaded: false,
    isAddressDataLoaded: false,
    activeToken: null,
  }),

  methods: {
    async prepareAddressData() {
      // Clear array before fill it with new data
      this.walletTransactionsData.splice(0, this.walletTransactionsData.length);

      const rawAccountTranactions = await this.getRawAddressTransactons();
      if (rawAccountTranactions) {
        this.walletTransactionsData.push(
          ...makeTransactionsPrettied(
            rawAccountTranactions.items,
            this.walletAddress
          )
        );
      }
      this.isAddressDataLoaded = true;
    },

    async getRawAddressTransactons() {
      try {
        return await getTransactions(this.$axios, this.walletAddress);
      } catch (error) {
        console.error(error);
      }
    },

    // --------------- Balance part

    async preparewalletBalanceData() {
      this.walletBalanceData.splice(0);

      const rawAccountData = await this.getRawwalletBalanceData();
      this.iswalletBalanceDataLoaded = true;
      if (rawAccountData) {
        this.walletBalanceData = this.makeBalancePrettier(
          rawAccountData.items
        );
      }
    },

    async getRawwalletBalanceData() {
      const queryParams = {
        "no-spam": true,
      };
      try {
        return await getBalances(this.$axios, this.walletAddress, queryParams);
      } catch (error) {
        console.error(error);
      }
    },

    makeBalancePrettier(rawAccountData) {
      return rawAccountData.filter((item) => {
        return (
          item["pretty_quote"] !== "$0.00" && item["pretty_quote"] !== null
        );
      });
    },

    showActiveItemOnChart(key) {
      this.activeToken = key;
    },
  },

  async beforeMount() {
    this.walletAddress = this.$route.params.wallet;
    await this.preparewalletBalanceData();
    await this.prepareAddressData();
  },

  watch: {
    "$route.params.wallet": {
      handler: function () {
        this.walletAddress = this.$route.params.wallet;
        this.preparewalletBalanceData();
        this.prepareAddressData();
      },
      deep: true,
      immediate: false,
    },
  },

  computed: {
    calculateTotalBalance() {
      return makeAmountReadable(
        this.walletBalanceData
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
  &__main-wrapper {
    margin-bottom: 24px;
    @media (min-width: 1280px) {
      display: flex;
    }
  }
  &__main-info {
    display: flex;
    flex-direction: column;
    gap: 12px;
    @media (min-width: 1280px) {
      width: 50%;
      flex-shrink: 0;
    }
  }

  &__donut {
    width: 100%;

    @media (min-width: 1280px) {
      width: 50%;
      flex-shrink: 0;
    }
  }

  &__donut-content {
    @media (min-width: 1280px) {
      position: sticky;
      top: 150px;
    }
  }
}
</style>