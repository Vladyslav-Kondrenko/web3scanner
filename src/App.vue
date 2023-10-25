<template>
  <v-app>
    <v-main>
      <app-header></app-header>
      <search-form @userSubmitedAddress="searchWalletStats" />
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import SearchForm from "@/components/SearchForm/SearchForm.vue";
import AppHeader from './layouts/Header/AppHeader.vue';

export default {
  name: "App",

  components: {
    SearchForm,
    AppHeader
  },

  data: () => ({
    searchValue: null,
  }),

  methods: {
    searchWalletStats(address) {
      this.searchValue = address;
    },
  },
};
</script>

<style lang="scss">
</style>