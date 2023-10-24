<template>
  <div class="wallet-card">
    <form class="wallet-card__form" @submit.prevent="walletCardSubmitHandler">
      <input @input="walletCardSubmitHandler"
        v-model="walletName"
        class="wallet-card__input"
        placeholder="Input wallet`s name"
      />

      <div class="wallet-card__wallet">
        <copy-content :contentForCopy="getWalletsAddress">
          <template v-slot:content>
            <router-link :to="'/address/' + getWalletsAddress">{{ slicedWalletAddress }}</router-link>
          </template>
        </copy-content>
        <favorite-wallet :wallet="getWalletsAddress" @deleteWalletFromFavorite="updateCardsAfterDelete"></favorite-wallet>
      </div>

      <textarea @input="walletCardSubmitHandler"
        class="wallet-card__textarea"
        v-model="walletNote"
        placeholder="Add note"
        cols="30"
        rows="10"
      ></textarea>

    </form>
  </div>
</template>

<script>
import FavoriteWallet from "./favoritesWallet/FavoriteWallet.vue";
import CopyContent from "./copyContent/CopyContent.vue";
import { sliceTransaction } from "@/helpers/sliceTransaction.js";
export default {
  components: {
    FavoriteWallet,
    CopyContent,
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
    saveButtonText: "Save",
  }),

  methods: {
    walletCardSubmitHandler() {
      const updatedWallet = {
        address: this.wallet.address,
        name: this.walletName,
        note: this.walletNote,
      };

      this.saveButtonText = "Saved";
      setTimeout(() => {
        this.saveButtonText = "Save";
      }, 1000);

      this.$emit("updateFavoriteWallet", updatedWallet);
    },

    updateCardsAfterDelete(){
      this.$emit('deleteWalletFromFavorite');
    }
  },

  computed: {
    getWalletsAddress() {
      console.log(this.wallet)
      console.log(this.wallet.address, 'tttt')
      return this.wallet.address;
    },
    slicedWalletAddress() {
      return sliceTransaction(this.wallet.address);
    },
  },

  mounted() {
    console.log(this.$vuetify.display.mobile);
    this.walletName = this.wallet.name;
    this.walletNote = this.wallet.note;
  },

  watch: {
    wallet(){
      this.walletName = this.wallet.name;
      this.walletNote = this.wallet.note;
    }
  }
};
</script>

<style lang="scss">
.wallet-card {
  padding: 8px;
  border: 1px solid RGB(var(--v-theme-surface));
  background: RGB(var(--v-theme-surface));

  &__form {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__wallet {
    display: flex;
    align-content: center;
    gap: 4px;
  }

  &__textarea {
    resize: none;
    height: 120px;
    padding: 8px;
    color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
    transition: all 0.3s;
    &:focus {
      outline: none;
      background: RGB(var(--v-theme-background));
    }
  }

  &__input {
    padding: 8px;
    color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));

    &:focus {
      outline: none;
      background: RGB(var(--v-theme-background));
    }
  }

  &__submit{
    margin-top: 8px;
    
  }

}
</style>