<template>
  <ul v-if="accountBalanceData.length > 0" class="balance-tokens__list">
    <li
      v-for="(balanceItem, index) in accountBalanceData"
      class="balance-tokens__item"
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
        <p class="balance-tokens__item-quote">{{ balanceItem.pretty_quote ?? '$0.00' }}</p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  data: () => ({}),

  props: {
    accountBalanceData: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
  },

  methods:{
    handleImgErrorLoad(test){
      test.target.src = require(`@/components/AddressBalance/img/eth-default.svg`) ;
    }
  },

  computed: {},
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

    @media (min-width: 1280px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }

  &__item{
    display: flex;
    align-items: center;
    gap: 4px;
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

  &__item-name{
    font-size: .8em;
  }

  &__item-quote{
    font-size: 1em;
    font-weight: 600;
  }
  
}
</style>