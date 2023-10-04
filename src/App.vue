<template>
  <v-app>
    <v-main>
      <address-form @userSubmitedAddress="searchWalletStats" />
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import AddressForm from "@/components/AddressForm.vue";

export default {
  name: "App",

  components: {
    AddressForm,
  },

  data: () => ({
    walletAddress: null,
  }),

  methods: {
    searchWalletStats(address) {
      if (address.length === 0) {
        return;
      }
      this.walletAddress = address;
      this.$emit('walletAddress', this.walletAddress);
    },
  },
};
</script>
