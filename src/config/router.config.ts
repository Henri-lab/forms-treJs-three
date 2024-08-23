interface RouterItem {
  name: string;
  path: string;
  component: any;
}
let StatusComponent: RouterItem = {
  name: "状态栏组件",
  path: "/StatusComponent",
  component: () => import("../views/StatusComponent/index.vue"),
};
export default [StatusComponent];
