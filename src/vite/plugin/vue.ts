import vue from '@vitejs/plugin-vue';
import { templateCompilerOptions } from '@tresjs/core';

export function getVue() {
  return vue({
    // Other config
    ...templateCompilerOptions,
  });
}
