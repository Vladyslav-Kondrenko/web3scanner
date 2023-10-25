import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage";
import BlockPage from "@/pages/BlockPage";
import AddressPage from "@/pages/AddressPage";
import SingleTransactionPage from "@/pages/SingleTransactionPage";
import SavedWalletsPage from "@/pages/SavedWalletsPage";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/block/:id",
    name: "Block",
    component: BlockPage,
  },
  {
    path: "/address/:wallet",
    name: "Address",
    component: AddressPage,
  },
  {
    path: "/transaction/:hash",
    name: "Single Transaction",
    component: SingleTransactionPage,
  },
  {
    path: "/favorites-wallets/",
    name: "Saved Wallets",
    component: SavedWalletsPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
