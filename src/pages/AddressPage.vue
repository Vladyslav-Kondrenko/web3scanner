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

        <primary-card>
          <template v-slot:pretitle> Tokens </template>
          <template v-slot:content>
            <wallet-balance-list
              @activeItemKeyUpdated="showActiveItemOnChart"
              :accountBalanceData="accountBalanceData"
            ></wallet-balance-list>
          </template>
        </primary-card>
      </div>

      <div class="address-stats__donut">
        <donut-chart
          class="address-stats__donut-content"
          :accountBalanceData="accountBalanceData"
          :activeItemIndex="activeToken"
        ></donut-chart>
      </div>
    </div>

    <transactions-table
      v-if="prettiedWalletAddress.length > 0"
      :tableContent="prettiedWalletAddress"
    ></transactions-table>
  </v-container>
</template>

<script>
import TransactionsTable from "@/components/TransactionsTable/TransactionsTable.vue";
import CopyContent from "@/components/CopyContent/CopyContent.vue";
import { makeApiRequest } from "../assets/js/apiRequest";
import { makeTransactionsPrettied } from "@/assets/js/transactionsPrettier";
import AddToFavorites from "@/components/AddToFavorites/AddToFavorites.vue";
import PrimaryCard from "@/components/PrimaryCard/PrimaryCard.vue";
import WalletBalanceList from "@/components/WalletBalanceList/WalletBalanceList.vue";
import { sliceTransaction } from "@/helpers/sliceTransaction";
import { makeAmountReadable } from "@/helpers/makeAmountReadable";
import donutChart from "@/components/DonutChart/donutChart.vue";

export default {
  components: {
    TransactionsTable,
    CopyContent,
    AddToFavorites,
    PrimaryCard,
    WalletBalanceList,
    donutChart,
  },

  data: () => ({
    walletAddress: "",
    prettiedWalletAddress: [],
    accountBalanceData: [],
    queryPage: 0,

    activeToken: null,
    DONUT_ITEMS_LIMIT: 10,
  }),

  methods: {
    async prepareAddressData() {
      // Clear array before fill it with new data
      this.prettiedWalletAddress.splice(0, this.prettiedWalletAddress.length);

      const rawAccountTranactions = await this.getRawAddressTransactons();
      if (rawAccountTranactions) {
        this.prettiedWalletAddress.push(
          ...makeTransactionsPrettied(
            rawAccountTranactions.items,
            this.walletAddress
          )
        );
      }
    },

    async getRawAddressTransactons() {
      const url = `/address/${this.walletAddress}/transactions_v3/page/${this.queryPage}/`;
      const queryParams = {
        "block-signed-at-asc": true,
      };
      try {
        return await makeApiRequest(this.$axios, url, queryParams);
      } catch (error) {
        console.error(error);
      }
    },

    // --------------- Balance part

    async prepareAccountBalanceData() {
      this.accountBalanceData.splice(0);

      const rawAccountData = await this.getRawAccountBalanceData();

      if (rawAccountData) {
        this.accountBalanceData = this.makeBalancePrettier(
          rawAccountData.items
        );
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

    showActiveItemOnChart(key) {
      this.activeToken = key;
    },
  },

  async beforeMount() {
    this.walletAddress = this.$route.params.wallet;
    await this.prepareAccountBalanceData();
    await this.prepareAddressData();
  },

  watch: {
    "$route.params.wallet": {
      handler: function () {
        this.walletAddress = this.$route.params.wallet;
        this.prepareAccountBalanceData();
        this.prepareAddressData();
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