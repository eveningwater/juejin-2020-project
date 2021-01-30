import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { axiosPlugin } from './api/requestPlugin'
createApp(App)
  .use(store)
  .use(router)
  .use(axiosPlugin)
  .mount("#app");
