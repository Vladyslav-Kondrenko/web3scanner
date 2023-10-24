import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage";
import BlocksStats from "@/pages/BlockStats";
import AddressStats from "@/pages/AddressStats";
import TransactionStats from "@/pages/TransactionStats";
import FavoritesWallets from "@/pages/FavoritesWallets";

const routes = [
  {
    path: "/",
    name: "Home page",
    component: HomePage,
  },
  {
    path: "/block/:id",
    name: "Blocks Stats",
    component: BlocksStats,
  },
  {
    path: "/address/:wallet",
    name: "Address Stats",
    component: AddressStats,
  },
  {
    path: "/transaction/:hash",
    name: "Transaction Stats",
    component: TransactionStats,
  },
  {
    path: "/favorites-wallets/",
    name: "Favorites Wallets",
    component: FavoritesWallets,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
