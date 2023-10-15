<template>
  <ul class="header__menu">
    <li class="header__menu-item">
      <router-link :to="'/'">Home</router-link>
    </li>
    <li class="header__menu-item">
      <router-link :to="'/favorites-wallets/'">Favorites wallets</router-link>
    </li>
    <li class="header__menu-item">
      <router-link :to="'/search-history/'">Favorites wallets</router-link>
    </li>
  </ul>
</template>

<script>
export default {};
</script>

<style>
</style>