import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import routerItems from "../config/router.config";
const history = createWebHashHistory();
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/galaxy",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/index"),
  },
  {
    path:"/galaxy",
    name:"galaxy",
    component:()=> import("@/views/galaxy/index")
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
