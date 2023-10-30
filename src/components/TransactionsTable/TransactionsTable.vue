<template>
  <table class="tx-table" v-if="tableContent">
    <thead>
      <tr>
        <th>Status</th>
        <th>Date</th>
        <th>Block</th>
        <th>Txn Hash</th>
        <th>From</th>
        <th>To</th>
        <th>Tnx fee</th>
        <th>Value</th>
      </tr>
    </thead>

    <tbody>
      <template v-if="enableSceleton">
        <transactions-table-row-sceleton></transactions-table-row-sceleton>
      </template>
      <template v-if="!enableSceleton">
        <transactions-table-row v-for="(tableItem, index) in tableContent" :key="index" :tableItem="tableItem"></transactions-table-row>
      </template>
    </tbody>
  </table>
</template>

<script>
import TransactionsTableRow from "@/components/TransactionsTable/TransactionsTableRow.vue";
import TransactionsTableRowSceleton from "@/components/TransactionsTable/TransactionsTableRowSceleton.vue";

export default {
  components: {
    TransactionsTableRow,
    TransactionsTableRowSceleton,
  },
  props: {
    tableContent: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    enableSceleton: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data: () => ({}),

  methods: {},

  mounted(){
    console.log('mounted', this.enableSceleton);
  }
};
</script>

<style lang="scss">
table {
  /* border: 1px solid #ccc; */
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;

  a{
    color: #fff;
    transition: all .3s; 

    &:hover{
      opacity: 0.7;
    }
  }
}

table caption {
  font-size: 1.5em;
  margin: 0.5em 0 0.75em;
}

table tr {
  background-color: RGB(var(--v-theme-surface));
  border: 1px solid RGB(var(--v-theme-background));
  padding: 0.35em;
  transition: all 0.3s;
}

table tbody tr:hover{
  background-color: RGB(var(--v-theme-background));
}

table th,
table td {
  padding: 0.625em;
  text-align: center;
}

table th {
  font-size: 0.85em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

@media screen and (max-width: 768px) {
  table {
    border: 0;
  }

  table caption {
    font-size: 1.3em;
  }

  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  table tr {
    border: none;
    display: block;
    margin-bottom: 0.625em;
  }

  table td {
    border:none;
    display: block;
    font-size: 0.8em;
  }

  table td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }

  table td:last-child {
    border-bottom: 0;
  }
}
</style>