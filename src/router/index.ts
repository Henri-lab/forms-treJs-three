import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import routerItems from "../config/router.config";
const history = createWebHashHistory();
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/menu",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/index"),
  },
  {
    path:"/menu",
    name:"menu",
    component:()=> import("@/views/menu/index")
  }
];
routerItems.forEach((element) => {
  routes.push(element);
});
const router = createRouter({
  history,
  routes,
});
export default router;
