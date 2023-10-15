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
import SearchForm from "@/components/SearchForm.vue";
import AppHeader from './layouts/AppHeader.vue';

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
      this.$emit('searchValue', this.searchValue);
    },
  },
};
</script>
