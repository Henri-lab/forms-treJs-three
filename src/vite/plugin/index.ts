import vue from '@vitejs/plugin-vue';
import { getAutoImport } from './autoImport';
import { getComponent } from './component';
export function createPlugin() {
  return [vue(), getAutoImport(), getComponent()];
}
