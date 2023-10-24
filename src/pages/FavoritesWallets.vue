<template>
  <v-container>
    <h1>Favorites Wallets</h1>

    <div class="favorites-wallets__wrapper">
      <favorite-wallet-card
        v-for="(walletItem, index) in listOfFavoritesWallets"
        :key="index"
        :wallet="walletItem"
        @updateFavoriteWallet="updateFavoritesWallets"
      ></favorite-wallet-card>
    </div>

    <h2
      v-if="
        listOfFavoritesWallets == null || listOfFavoritesWallets.length === 0
      "
    >
      Favorites Wallets List is empty
    </h2>
  </v-container>
</template>

<script>
import { getCookie } from "@/helpers/getCookie";
// import { setCookie } from '@/helpers/setCookie';
import FavoriteWalletCard from "@/components/favoriteWalletCard.vue";
import { setCookie } from "@/helpers/setCookie";

export default {
  components: {
    FavoriteWalletCard,
  },

  data: () => ({
    listOfFavoritesWallets: [],
  }),

  methods: {
    updateFavoritesWallets(wallet) {
      console.log("update");
      const walletIndex = this.listOfFavoritesWallets.findIndex(
        (item) => item["address"] === wallet["address"]
      );

      this.listOfFavoritesWallets[walletIndex]["name"] = wallet.name;
      this.listOfFavoritesWallets[walletIndex]["note"] = wallet.note;
      console.log(this.listOfFavoritesWallets);

      setCookie("favoritesWallets", this.listOfFavoritesWallets);
    },
  },

  mounted() {
    this.listOfFavoritesWallets = getCookie("favoritesWallets");
    console.log(this.listOfFavoritesWallets);
  },
};
</script>

<style lang="scss">
.favorites-wallets{
  &__wrapper{
    display: grid;
    gap: 16px;
    grid-template-columns: 1fr;

    @media (min-width: 768px){
      grid-template-columns: 1fr 1fr;
    }

    @media (min-width: 1280px){
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
}
</style>
