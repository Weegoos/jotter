import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { quasar } from '@quasar/vite-plugin';

export default defineConfig({
  plugins: [
    vue(),
    quasar({
      sassVariables: 'src/css/quasar-variables.sass',
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
});
