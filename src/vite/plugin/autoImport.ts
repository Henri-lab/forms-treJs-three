import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export function getAutoImport() {
  return AutoImport({
    imports: ['vue', 'vue-router', 'pinia'],
    resolvers: [ElementPlusResolver()],
  });
}
