import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export function getComponent() {
  return Components({
    resolvers: [ElementPlusResolver()],
  });
}
