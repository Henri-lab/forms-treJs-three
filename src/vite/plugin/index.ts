import { getVue } from './vue';
import { getAutoImport } from './autoImport';
import { getComponent } from './component';
import { getCopy } from './copy';
import glsl from 'vite-plugin-glsl';
// import { viteExternalsPlugin } from 'vite-plugin-externals';
export function createPlugin() {
  return [
    getVue(),
    getAutoImport(),
    getComponent(),
    glsl(),
    getCopy(),
    // viteExternalsPlugin({
    //   vue: 'Vue',
    //   disableInServe: true, // 开发模式下不进行转换
    //   enforce: 'pre', // 强制插件执行顺序
    //   filter: (code, id) => {
    //     // 返回 true 将转换为外部依赖
    //     return /\.vue$/.test(id);
    //   },
    // }),
  ];
}
