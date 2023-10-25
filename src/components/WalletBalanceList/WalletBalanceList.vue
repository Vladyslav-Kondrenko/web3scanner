<template>
  <ul
    v-if="accountBalanceData.length > 0"
    class="balance-tokens__list"
    ref="balanceList"
  >
    <li
      v-for="(balanceItem, index) in getAccountBalanceData"
      class="balance-tokens__item"
      @mouseover.stop="itemMouseEnterHandler(index)"
      @mouseleave.stop="itemMouseLeaveHandler"
      :key="index"
    >
      <div class="balance-tokens__item-img">
        <img
          :src="balanceItem.logo_url"
          :alt="balanceItem.contranct_name"
          @error="handleImgErrorLoad"
          width="24"
          height="24"
        />
      </div>
      <div class="balance-tokens__item-info">
        <p class="balance-tokens__item-name">
          {{ balanceItem.contract_name }} (
          {{ balanceItem.contract_ticker_symbol }} )
        </p>
        <p class="balance-tokens__item-quote">
          {{ balanceItem.pretty_quote ?? "$0.00" }}
        </p>
      </div>
    </li>
  </ul>
  <div
    v-if="accountBalanceData.length > DEFAULT_ITEM_VISIBLE_COUNT"
    class="balance-tokens__showmore"
  >
    <v-btn
      class="balance-tokens__showmore-button"
      @click="showMoreHandler"
      prepend-icon="$vuetify"
      size="small"
    >
      Show {{ showFullBalance ? "Less" : "More" }}
    </v-btn>
  </div>
</template>

<script>
import { scrollToTargetAdjusted } from "@/helpers/scrollToTargetAdjusted";
export default {
  data: () => ({
    DEFAULT_ITEM_VISIBLE_COUNT: 20,
    showFullBalance: false,
    activeElementKey: null,
  }),

  props: {
    accountBalanceData: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
  },

  computed: {
    getAccountBalanceData() {
      return this.showFullBalance
        ? this.accountBalanceData
        : this.accountBalanceData.slice(0, this.DEFAULT_ITEM_VISIBLE_COUNT);
    },
  },

  methods: {
    handleImgErrorLoad(error) {
      error.target.src = require(`@/components/WalletBalanceList/img/eth-default.svg`);
    },

    showMoreHandler() {
      this.showFullBalance = !this.showFullBalance;
      if (!this.showFullBalance) {
        scrollToTargetAdjusted(this.$refs.balanceList);
      }
    },

    itemMouseEnterHandler(index) {
      this.$emit('activeItemKeyUpdated', index);
    },

    itemMouseLeaveHandler() {
      this.$emit('activeItemKeyUpdated', null);

    },
  },
};
</script>

<style lang="scss">
.balance-tokens {
  &__list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 0;
    margin: 0;
    list-style: none;

    @media (min-width: 767px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all .3s;
    padding: 4px 8px;
    border: 1px solid RGB(var(--v-theme-background));
    border-radius: 4px;
    cursor: pointer;
    &:hover{
      background:  RGB(var(--v-theme-info));
    }
  }

  &__item-img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: auto;
      object-fit: cover;
      object-position: center center;
    }
  }

  &__item-name {
    font-size: 0.8em;
    word-break: break-all;
  }

  &__item-quote {
    font-size: 1em;
    font-weight: 600;
  }

  &__showmore {
    text-align: center;
    padding-top: 16px;
  }
}
</style>