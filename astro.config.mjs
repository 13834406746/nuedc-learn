// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// base 必须与 GitHub 仓库名一致
export default defineConfig({
  base: '/nuedc-learn/',
  integrations: [mdx()],
});
