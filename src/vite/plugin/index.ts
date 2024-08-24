import { getVue } from './vue';
import { getAutoImport } from './autoImport';
import { getComponent } from './component';
import glsl from 'vite-plugin-glsl';
export function createPlugin() {
  return [getVue(), getAutoImport(), getComponent(), glsl()];
}
