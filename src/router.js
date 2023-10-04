import {createRouter, createWebHistory} from 'vue-router'
import HomePage from "@/pages/HomePage";
import BlocksStats from "@/pages/BlockStats";
import AddressStats from "@/pages/AddressStats";
import TransactionInfo from "@/pages/TransactionInfo";



const routes = [
    {
        path: '/',
        name: 'Home page',
        component: HomePage,
    },
    {
        path: '/block/:id',
        name: 'Blocks Stats',
        component: BlocksStats,
    },
    {
        path: '/address/:wallet',
        name: 'Address Stats',
        component: AddressStats,
    },
    {
        path: '/transaction/:hash',
        name: 'Transaction Info',
        component: TransactionInfo,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router;