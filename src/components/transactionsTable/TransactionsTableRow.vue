<template>
  <tr>
    <transactions-table-cell :content="tableItem['successful']"></transactions-table-cell>
    <transactions-table-cell :content="tableItem['block_signed_at']"></transactions-table-cell>
    <transactions-table-cell :content="tableItem['block_height']"></transactions-table-cell>
    <transactions-table-cell :content="tableItem['tx_hash']"></transactions-table-cell>
    <transactions-table-cell :content="tableItem['from_address']"></transactions-table-cell>
    <transactions-table-cell :content="tableItem['to_address']"></transactions-table-cell>
    <transactions-table-cell :content="tableItem['pretty_gas_quote']"></transactions-table-cell>
    <transactions-table-cell :content="tableItem['pretty_value_quote']"></transactions-table-cell>
  </tr>
</template>

<script>
import TransactionsTableCell from "@/components/transactionsTable/TransactionsTableCell.vue";

export default {
  components: {
    TransactionsTableCell,
  },
  props: {
    tableItem: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
};
</script>

<style>
</style>