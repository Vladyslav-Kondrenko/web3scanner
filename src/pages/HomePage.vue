<template>
  <v-container>
    <h1 class="h1">Related Pages</h1>
    <v-row align="start" justify="center">
      <v-col  cols="6">
        <v-card
          title="Expample of Single Wallet Page"
          text="Wallet`s detailed information page. Includes last transactions and wallet balance."
        >
          <v-card-actions>
            <router-link
              to="/address/0xd8da6bf26964af9d7eed9e03e53415d37aa96045/"
            >
              <v-btn size="large" variant="text" color="#ffffffde">Visit</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          title="Favorites Wallets"
          text="Page with saved wallets. Press heart icon behind address to save addresses."
        >
          <v-card-actions>
            <router-link
              to="/address/0xd8da6bf26964af9d7eed9e03e53415d37aa96045/"
            >
              <v-btn size="large" variant="text" color="#ffffffde">Visit</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
  .h1{
    margin-bottom: 16px;
  }
</style>