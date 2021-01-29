import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/info",
    name: "Info",
    component: () => import('../views/Info.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
