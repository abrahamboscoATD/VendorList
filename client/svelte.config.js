import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [vitePreprocess({})],

  kit: {
    adapter: adapter(),
    alias: {
      '@': './src',
      '@/*': './src/*'
    },
    files: {
      hooks: {
        client: 'src/lib/config/hooks.client.ts',
        server: 'src/lib/config/hooks.server.ts'
      }
    }
  }
};

export default config;
