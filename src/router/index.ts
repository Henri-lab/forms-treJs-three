import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import routerItems from "../config/router.config";
const history = createWebHashHistory();
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/index"),
  },
];
routerItems.forEach((element) => {
  routes.push(element);
});
const router = createRouter({
  history,
  routes,
});
export default router;
