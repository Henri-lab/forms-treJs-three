import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import Tres from '@tresjs/core';
import draggable from './directive/draggable';
import 'animate.css';
// import DataV from '@dataview/datav-vue3';//有bug这个包

createApp(App)
  .use(router)
  .use(store)
  .use(ElementPlus)
  .use(Tres)
//   .use(DataV as any, { classNamePrefix: 'dv-' })
  .directive('draggable', draggable)
  .mount('#app');
