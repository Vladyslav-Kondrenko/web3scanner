<template>
  <button
    class="favorite-wallet__button"
    :class="{ 'favorite-wallet__button--active': walletActiveStatus }"
    @click.prevent="favoriteWalletButtonHandler"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18px"
      height="18px"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path id="favorite-wallet__heart-border"
        opacity="0.15"
        d="M4.3314 12.0474L12 20L19.6686 12.0474C20.5211 11.1633 21 9.96429 21 8.71405C21 6.11055 18.9648 4 16.4543 4C15.2487 4 14.0925 4.49666 13.24 5.38071L12 6.66667L10.76 5.38071C9.90749 4.49666 8.75128 4 7.54569 4C5.03517 4 3 6.11055 3 8.71405C3 9.96429 3.47892 11.1633 4.3314 12.0474Z"
        fill="#000000"
      />
      <path
        id="favorite-wallet__heart"
        d="M4.3314 12.0474L12 20L19.6686 12.0474C20.5211 11.1633 21 9.96429 21 8.71405C21 6.11055 18.9648 4 16.4543 4C15.2487 4 14.0925 4.49666 13.24 5.38071L12 6.66667L10.76 5.38071C9.90749 4.49666 8.75128 4 7.54569 4C5.03517 4 3 6.11055 3 8.71405C3 9.96429 3.47892 11.1633 4.3314 12.0474Z"
        stroke="#000000"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </button>
</template>

<script>
import { getCookie } from "@/helpers/getCookie";
import { setCookie } from "@/helpers/setCookie";
export default {
  data: () => ({
    walletActiveStatus: false,
  }),

  props: {
    wallet: {
      type: String,
      required: true,
      default: "",
    },
  },

  methods: {
    favoriteWalletButtonHandler() {
      this.isWalletFavorite()
        ? this.deleteWalletFromFavorite(this.wallet)
        : this.addWalletToFavorite(this.wallet);
      console.log(getCookie("favoritesWallets"));
    },

    getFavoritesWallets() {
      let favoritesWallets = getCookie("favoritesWallets");

      if (favoritesWallets === null) {
        setCookie("favoritesWallets", []);
        favoritesWallets = [];
      }

      return favoritesWallets;
    },

    isWalletFavorite() {
      let favoritesWallets = this.getFavoritesWallets();
      return (
        favoritesWallets.find((item) => item["address"] === this.wallet) !==
        undefined
      );
    },

    addWalletToFavorite(wallet) {
      let favoritesWallets = this.getFavoritesWallets();
      console.log("add");
      if (!this.isWalletFavorite()) {
        favoritesWallets.push({
          address: wallet,
          name: "",
          note: "",
        });
        setCookie("favoritesWallets", favoritesWallets);
        this.walletActiveStatus = !this.walletActiveStatus;
      }
    },

    deleteWalletFromFavorite(wallet) {
      console.log("wallet to delete", wallet);
      let favoritesWallets = this.getFavoritesWallets();

      if (this.isWalletFavorite()) {
        favoritesWallets = favoritesWallets.filter(
          (item) => item["address"] != wallet
        );
        setCookie("favoritesWallets", favoritesWallets);
        this.walletActiveStatus = !this.walletActiveStatus;
        console.log(getCookie("favoritesWallets"), "getcookie after delete");
      }
    },
  },

  mounted() {
    this.walletActiveStatus = this.isWalletFavorite();
  },

  watch: {
    wallet: {
      handler: function () {
        console.log("watcth work", this.wallet);
        this.walletActiveStatus = this.isWalletFavorite();
      },
      immediate: false,
    },
  },
};
</script>

<style>
.favorite-wallet__button #favorite-wallet__heart {
  stroke: rgba(var(--v-theme-on-info), var(--v-high-emphasis-opacity));;
}
.favorite-wallet__button--active svg #favorite-wallet__heart {
  fill: RGB(var(--v-theme-info));
  stroke: RGB(var(--v-theme-info));
}
</style>