import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import axios from "./axios";
import { loadFonts } from "./plugins/webfontloader";
import router from "@/router";
import VueApexCharts from "vue3-apexcharts";

loadFonts();

const app = createApp(App).use(vuetify).use(router).use(VueApexCharts);

app.config.globalProperties.$axios = axios;

app.mount("#app");
