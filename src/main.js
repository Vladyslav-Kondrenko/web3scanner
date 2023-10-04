import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import axios from "./axios";
import { loadFonts } from "./plugins/webfontloader";
import router from "@/router";
loadFonts();

const app = createApp(App).use(vuetify).use(router);

app.config.globalProperties.$axios = axios;

app.mount("#app");
