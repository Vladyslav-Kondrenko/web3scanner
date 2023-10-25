<template>
  <div class="single-transaction">
    <div class="single-transaction__item" v-if="txHash">
      <div class="single-transaction__item-name">Transaction Hash:</div>
      <div class="single-transaction__item-value">
        <copy-content  :contentForCopy="txHash">
          <template v-slot:content>{{ txHash }}</template>
        </copy-content>
      </div>
    </div>
    <div class="single-transaction__item" v-if="status">
      <div class="single-transaction__item-name">Status:</div>
      <div class="single-transaction__item-value" v-html="status"></div>
    </div>
    <div class="single-transaction__item" v-if="block">
      <div class="single-transaction__item-name">Block:</div>
      <div class="single-transaction__item-value">
        <copy-content :contentForCopy="block" :visualContent="block">
          <template v-slot:content>{{ block }}</template>
        </copy-content>
      </div>
    </div>
    <div class="single-transaction__item" v-if="timestamp">
      <div class="single-transaction__item-name">Timestamp:</div>
      <div class="single-transaction__item-value" v-html="timestamp"></div>
    </div>
    <div class="single-transaction__item" v-if="fromAddress">
      <div class="single-transaction__item-name">From:</div>
      <div class="single-transaction__item-value">
        <copy-content :contentForCopy="fromAddress" :visualContent="fromAddress">
          <template v-slot:content>{{ fromAddress }}</template>
        </copy-content>
      </div>
    </div>
    <div class="single-transaction__item" v-if="toAddress">
      <div class="single-transaction__item-name">To:</div>
      <div class="single-transaction__item-value">
        <copy-content :contentForCopy="toAddress" :visualContent="toAddress">
          <template v-slot:content>{{ toAddress }}</template>
        </copy-content>
      </div>
    </div>
    <div class="single-transaction__item" v-if="value">
      <div class="single-transaction__item-name">Value:</div>
      <div class="single-transaction__item-value" v-html="value"></div>
    </div>
    <div class="single-transaction__item" v-if="fee">
      <div class="single-transaction__item-name">Transaction Fee:</div>
      <div class="single-transaction__item-value" v-html="fee"></div>
    </div>
    <div class="single-transaction__item" v-if="gasPrice">
      <div class="single-transaction__item-name">Gas Price:</div>
      <div class="single-transaction__item-value" v-html="gasPrice"></div>
    </div>
  </div>
</template>

<script>
import CopyContent from "../copyContent/CopyContent.vue";
export default {
  components: {
    CopyContent,
  },

  props: {
    transactionData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },

  computed: {
    txHash() {
      return this.transactionData[0]["tx_hash"];
    },
    status() {
      return this.transactionData[0]["successful"];
    },
    block() {
      return this.transactionData[0]["block_height"];
    },
    timestamp() {
      return this.transactionData[0]["block_signed_at"];
    },
    logEvents() {
      return this.transactionData[0]["log_events"];
    },
    fromAddress() {
      return this.transactionData[0]["from_address"];
    },
    toAddress() {
      return this.transactionData[0]["to_address"];
    },
    value() {
      return this.transactionData[0]["pretty_value_quote"];
    },
    fee() {
      return this.transactionData[0]["block_signed_at"];
    },
    gasPrice() {
      return this.transactionData[0]["pretty_gas_quote"];
    },
  },
};
</script>

<style lang="scss">
  .single-transaction{
    padding: 8px 12px;
    background: RGB(var(--v-theme-surface));
    display: flex;
    flex-direction: column;

    &__item{
      display: flex;
      flex-direction: column;
      padding: 8px 4px;

      @media (min-width: 768px) {
        flex-direction: row;
      }

      &:not(:first-of-type){
        border-top: 1px solid RGB(var(--v-theme-background))
      }
    }

    &__item-name{
      width: 20%;
      min-width: 140px;
    }

    &__item-value{
      word-break: break-all;
    }
  }
</style>