import { defineConfig } from 'vite';
import path from 'path';
import { createPlugin } from './src/vite/plugin';
import copy from 'rollup-plugin-copy';
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: true, // 代码压缩
    sourcemap: true, // 生成 source map 文件，方便调试
    rollupOptions: {
      treeshake: true, // Tree-shaking
    },
  },
  envDir: 'env',
  plugins: createPlugin(), // 注册插件
  // base: process.env.VITE_BASE_URL || './',
  base:"/",
  server: {
    open: true,
  },
  resolve: {
    alias: {
      // 如果报错__dirname找不到，需要安装node,执行npm install --save-dev @types/node
      '@': path.resolve(__dirname, 'src'),
      '~c': '/src/components',
      // '@dataview/datav-vue3': 'node_modules/@dataview/datav-vue3/es/index.mjs',
    },
    extensions: ['.ts', '.js', '.mjs', 'glsl', '.json', '.vue', '.jsx', '.tsx'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: [
          '@import "@/assets/scss/mixin.scss";',
          '@import "@/assets/scss/_var.scss";',
        ].join('\n'),
      },
    },
    postcss: {
      plugins: [
        {
          postcssPlugin: 'internal:charset-removal',
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === 'charset') {
                atRule.remove();
              }
            },
          },
        },
      ],
    },
  },
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false, // 添加这一行
  },
});
