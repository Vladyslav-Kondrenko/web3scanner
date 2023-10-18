<template>
  <ul v-if="accountBalanceData.length > 0" class="balance-tokens__list">
    <li
      v-for="(balanceItem, index) in accountBalanceData"
      class="balance-tokens__item"
      :key="index"
    >
      <div class="balance-tokens__img">
        <img
          :src="balanceItem.logo_url"
          :alt="balanceItem.contranct_name"
          width="24"
          height="24"
        />
      </div>
      <p class="balance-tokens__item-name">
        {{ balanceItem.contract_name }} (
        {{ balanceItem.contract_ticker_symbol }} )
      </p>
      <p class="balance-tokens__item-quote">{{ balanceItem.pretty_quote }}</p>
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

  computed: {},
};
</script>

<style lang="scss">
.balance-tokens {
  &__list {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  &__img{
    width: 48px;
    height: 48px;
    border-radius: 50%;
    overflow: hidden;

    img{
      width: 100%;
      height: auto;
      object-fit: cover;
      object-position: center center;
    }
  }


}
</style>