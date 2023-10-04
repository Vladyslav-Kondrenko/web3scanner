<template>
  <v-container>
    <v-form class="d-flex align-center" @submit.prevent="submitSearch">
      <v-text-field
        class="mr-5"
        label="Your Wallet Address"
        hide-details="true"
        v-model="walletAddress"
      ></v-text-field>
      <v-btn type="submit" prepend-icon="$vuetify" size="x-large">
        Search
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {

  data: () => ({
    walletAddress: "0x4c948bB3845BEfba915B9459c7A15a3A21349cF9",
  }),

  methods: {
    submitSearch() {
      this.$router.push('/address/' + this.walletAddress);
      this.walletAddress = '';
    },
  },

};
</script>

<style>
</style>