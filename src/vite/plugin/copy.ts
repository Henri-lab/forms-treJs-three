import copy from 'rollup-plugin-copy';

export function getCopy() {
  return copy({
    targets: [
      { src: '**/*.png', dest: 'dist/assets' },
      { src: '**/*.jpg', dest: 'dist/assets' },
    ],
    hook: 'buildEnd',
  });
}
