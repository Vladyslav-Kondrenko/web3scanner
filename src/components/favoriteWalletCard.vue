<template>
  <div class="wallet-card">
    <form @submit.prevent="walletCardSubmitHandler">
      <input
        v-model="walletName"
        class="wallet-card__name-input"
        placeholder="Input wallet`s name"
      />
      <router-link :to="'/address/' + getWalletsAddress">{{
        getWalletsAddress
      }}</router-link>
      <favorite-wallet :wallet="getWalletsAddress"></favorite-wallet>
      <textarea
        v-model="walletNote"
        placeholder="Add note"
        cols="30"
        rows="10"
      ></textarea>
      <input type="submit" name="submit" id="" />
    </form>
  </div>
</template>

<script>
import FavoriteWallet from "./favoritesWallet/FavoriteWallet.vue";
export default {
  components: {
    FavoriteWallet,
  },

  props: {
    wallet: {
      type: Object,
      required: true,
      default: () => {
        return {};
      },
    },
  },

  data: () => ({
    walletName: "",
    walletNote: "",
  }),

  methods:{
    walletCardSubmitHandler(){
        const updatedWallet = {
            address: this.wallet.address,
            name: this.walletName,
            note: this.walletNote
        }

        this.$emit('updateFavoriteWallet', updatedWallet);
    }
  },

  computed: {
    getWalletsAddress() {
      console.log(this.wallet.address)
      return this.wallet.address ?? null;
    },
  },

  mounted() {
    console.log(this.$vuetify.display.mobile)
    this.walletName = this.wallet.name;
    this.walletNote = this.wallet.note;
  },
};
</script>

<style>
textarea {
  resize: none;
  height: 25px;
}
</style>