import { defineConfig } from 'astro/config';

// Served from the custom domain deseret.ink (public/CNAME), so base is "/".
export default defineConfig({
  site: 'https://deseret.ink',
  trailingSlash: 'always',
  build: { format: 'directory' },
  // Stickers became Products (the page also carries the poster); keep old links working.
  redirects: { '/stickers': '/products/' },
});
