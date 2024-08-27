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

// 导入 vue-echarts 和 echarts
import ECharts from 'vue-echarts';
import { use } from 'echarts/core';

// 导入需要的 echarts 模块
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, PieChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  VisualMapComponent,
  TitleComponent,
} from 'echarts/components';

// 使用这些模块
use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent,
  PieChart,
  VisualMapComponent,
  TitleComponent,
]);

createApp(App)
  .use(router)
  .use(store)
  .use(ElementPlus)
  .use(Tres)
  //   .use(DataV as any, { classNamePrefix: 'dv-' })
  .directive('draggable', draggable)
  // 注册 vue-echarts 组件
  .component('v-chart', ECharts)
  .mount('#app');
