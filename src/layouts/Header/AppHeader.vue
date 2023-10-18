<template>
  
  <v-navigation-drawer
  temporary
  v-model="drawer"
  location="right"
  >
  <main-menu></main-menu>
</v-navigation-drawer>

<v-app-bar>
    <v-container>
    <main-menu v-if="smAndUp" class="v-toolbar__content"></main-menu>
    <v-spacer></v-spacer>
    <v-app-bar-nav-icon
      class="hidden-sm-and-up"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>
  </v-container>
  </v-app-bar>
</template>

<script>
import MainMenu from "@/layouts/Header/MainMenu.vue";
import { useDisplay } from "vuetify";

export default {
  components: {
    MainMenu,
  },

  data() {
    return {
      drawer: false,
      ...useDisplay(),
    };
  },
  computed: {},

  mounted() {},
};
</script>

<style>
</style>