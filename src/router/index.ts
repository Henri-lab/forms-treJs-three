import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import routerItems from "../config/router.config";
const history = createWebHashHistory();
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/three",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/index"),
  },
  {
    path:"/three",
    name:"three",
    component:()=> import("@/components/threeVue/index")
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
