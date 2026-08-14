// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// base 必须与 GitHub 仓库名一致
export default defineConfig({
  site: 'https://13834406746.github.io',
  base: '/nuedc-learn/',
  integrations: [mdx()],
});
