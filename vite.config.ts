import { defineConfig } from 'vite';
import path from 'path';
import { createPlugin } from './src/vite/plugin';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: 'env',
  plugins: createPlugin(), // 注册插件
  base: './',
  server: {
    open: true,
  },
  resolve: {
    alias: {
      // 如果报错__dirname找不到，需要安装node,执行npm install --save-dev @types/node
      '@': path.resolve(__dirname, 'src'),
      comps: path.resolve(__dirname, 'src/components'),
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
