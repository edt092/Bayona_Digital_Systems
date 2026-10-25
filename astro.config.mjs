import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.bayonadigitalsystems.com',
  vite: {
    plugins: [tailwindcss()],
    // Scripts siempre en archivos externos: permite una CSP sin 'unsafe-inline' en script-src
    build: { assetsInlineLimit: 0 },
  },
});
