<template>
  <v-app>
    <v-main>
      <search-form @userSubmitedAddress="searchWalletStats" />
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import SearchForm from "@/components/SearchForm.vue";

export default {
  name: "App",

  components: {
    SearchForm,
  },

  data: () => ({
    searchValue: null,
  }),

  methods: {
    searchWalletStats(address) {
      this.searchValue = address;
      this.$emit('searchValue', this.searchValue);
    },
  },
};
</script>
