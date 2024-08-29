import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import routerItems from "../config/router.config";
const history = createWebHashHistory();
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/menu",//stack 溢出 path和redirect一样
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
