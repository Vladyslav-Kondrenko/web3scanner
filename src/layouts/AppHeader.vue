<template>
  <!-- <ul class="header__menu">
    <li class="header__menu-item">
      <router-link :to="'/'">Home</router-link>
    </li>
    <li class="header__menu-item">
      <router-link :to="'/favorites-wallets/'">Favorites Wallets</router-link>
    </li>
    <li class="header__menu-item">
      <router-link :to="'/search-history/'">Search History</router-link>
    </li>
  </ul> -->

  <v-navigation-drawer
    floating
    color="blue-grey"
    :permanent="$vuetify.breakpoint.mdAndUp" v-model="drawer"
  >
    <v-list-item
      title="Web3Scanner"
      subtitle="Web3Scanner"
      :to="'/'"
    ></v-list-item>
    <v-divider></v-divider>
    <v-list-item
      link
      title="Favorites Wallets"
      :to="'/favorites-wallets/'"
    ></v-list-item>
    <v-list-item
      link
      title="Search History"
      :to="'/search-history'"
    ></v-list-item>
  </v-navigation-drawer>

  <v-toolbar color="white" absolute right>
    <v-toolbar-side-icon
      class="hidden-md-and-up"
      @click.stop="drawer = !drawer"
    ></v-toolbar-side-icon>
  </v-toolbar>
</template>

<script>
export default {
  data () {
    return {
      drawer: null
    }
  },
  computed: {
  },
};
</script>

<style>
</style>