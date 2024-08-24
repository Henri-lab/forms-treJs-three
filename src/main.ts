import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
import Tres from '@tresjs/core'

createApp(App).use(router).use(store).use(ElementPlus).use(Tres).mount("#app");
