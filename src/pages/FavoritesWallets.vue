<template>
  <h1>Favorites Wallets</h1>

  <favorite-wallet-card
    v-for="(walletItem, index) in listOfFavoritesWallets"
    :key="index"
    :wallet="walletItem"
    @updateFavoriteWallet="updateFavoritesWallets"
  ></favorite-wallet-card>

  <h2 v-if="listOfFavoritesWallets == null || listOfFavoritesWallets.length === 0">Favorites Wallets List is empty</h2>
</template>

<script>
import { getCookie } from "@/helpers/getCookie";
// import { setCookie } from '@/helpers/setCookie';
import FavoriteWalletCard from "@/components/favoriteWalletCard.vue";
import { setCookie } from '@/helpers/setCookie';

export default {
  components: {
    FavoriteWalletCard,
  },

  data: () => ({
    listOfFavoritesWallets: [],
  }),

  methods: {
    updateFavoritesWallets(wallet) {
      console.log('update')
      const walletIndex = this.listOfFavoritesWallets.findIndex(
        (item) => item["address"] === wallet["address"]
      );

      this.listOfFavoritesWallets[walletIndex]['name'] = wallet.name;
      this.listOfFavoritesWallets[walletIndex]['note'] = wallet.note;

      setCookie('favoritesWallets', this.listOfFavoritesWallets);
    },
  },

  mounted() {
    this.listOfFavoritesWallets = getCookie("favoritesWallets");
  },
};
</script>

<style>
</style>
