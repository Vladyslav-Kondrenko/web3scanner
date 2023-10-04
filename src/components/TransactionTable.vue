<template>
  <table>
    <tr v-if="this.transactionInfo.blockHeight">
      <td>Block</td>
      <td><router-link :to="'/block/'+this.transactionInfo.blockHeight">{{ this.transactionInfo.blockHeight }}</router-link></td>
    </tr>
    <tr v-if="this.transactionInfo.fromAddress">
      <td>From</td>
      <td><router-link :to="'/address/'+this.transactionInfo.fromAddress">{{ this.transactionInfo.fromAddress }}</router-link></td>
    </tr>
    <tr v-if="this.transactionInfo.toAddress">
      <td>To</td>
      <td><router-link :to="'/address/'+this.transactionInfo.toAddress">{{ this.transactionInfo.toAddress }}</router-link></td>
    </tr>
    <tr v-if="this.transactionInfo.value">
      <td>Value</td>
      <td>{{ this.transactionInfo.value }} ETH</td>
    </tr>
    <tr v-if="this.transactionInfo.gasMetadata.offered">
      <td>Fee</td>
      <td>
        <p>
          {{ this.transactionInfo.gasMetadata.spend }}
        </p>
        <div class="details">
          <p>Initial: {{ this.transactionInfo.gasMetadata.offered }} ETH</p>
          <p>Refunded: {{ this.transactionInfo.gasMetadata.refunds }} ETH</p>
        </div>
      </td>
    </tr>
    <tr v-if="this.transactionInfo.blockSignedAt">
      <td>Date</td>
      <td>{{ this.transactionInfo.blockSignedAt }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  props: {
    transactionInfo: {
      type: Object,
      required: true,
      default() {
        return {};
      },
    },
  },
};
</script>

<style>
</style>