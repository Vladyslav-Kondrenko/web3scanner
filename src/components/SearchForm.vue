<template>
  <v-container>
    <v-form class="d-flex align-center" @submit.prevent="submitSearch">
      <v-text-field
      ref="submitInput"
        class="mr-5"
        label="Search by address / Tnx Hash / Block / Domain Name"
        :error="hasInputError"
        :error-messages="errorMessage"
        hide-details="auto"
        v-model="searchValue"
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
    searchValue: "0x4c948bB3845BEfba915B9459c7A15a3A21349cF9",
    hasInputError: false,
    errorMessage: '',
  }),

  methods: {
    submitSearch() {
      if(this.searchValue === ''){
        this.setValidationError('Oops! You have entered an empty search string.')
        return;
      }
      let route = '';
      // check is it a wallet. All wallets have 42 symbols
      if(this.searchValue.length === 42 || this.searchValue.slice(-4) === '.eth'){
        route = '/address/';
        // check is it a hash. All hash have 66 symbols
      } else if(this.searchValue.length === 66){
        route = '/hash/';
        // check is it a block. All blocks have 8 symbols
      } else if(this.searchValue.length === 8){
        route = '/block/';
      } else{
        this.setValidationError(`Oops! The search string you entered was: "${this.searchValue}". Error! Missing search term.`);
        return;
      }
      
      this.$router.push(route + this.searchValue);
      this.searchValue = '';
    },

    setValidationError(message) {
      this.hasInputError = true;
      this.errorMessage = message;
    },

    clearValidationError() {
      this.hasInputError = false;
      this.errorMessage = '';
    },
  },
};
</script>

<style>
</style>