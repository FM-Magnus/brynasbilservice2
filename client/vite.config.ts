import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(async ({ command }) => {
  // vite-imagetools is ESM-only and this config is loaded as CommonJS (no
  // "type": "module" in package.json), so it is imported dynamically. It only
  // processes imports carrying directives (e.g. ?w=640;1920) — the folder-driven
  // gallery — and leaves plain image imports untouched.
  const { imagetools } = await import('vite-imagetools');
  return {
    plugins: [react(), guardDeletedImages(imagetools())],
    base: command === 'serve' ? '/' : '/brynasbilservice/',
  };
});

// Dev only: imagetools renders a variant lazily when the browser first requests
// it. If the source photo was deleted from src/assets/galleri/ in the meantime,
// sharp emits an unhandled stream error that crashes the dev server. Attach an
// error handler to the piped image stream and answer 404 instead.
function guardDeletedImages(plugin: Plugin): Plugin {
  const configureServer = plugin.configureServer;
  if (typeof configureServer !== 'function') return plugin;
  return {
    ...plugin,
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/@imagetools/')) {
          res.once('pipe', (source: NodeJS.ReadableStream) => {
            source.once('error', (error: Error) => {
              server.config.logger.warn(`[galleri] ${error.message}`);
              if (!res.headersSent) res.statusCode = 404;
              res.end();
            });
          });
        }
        next();
      });
      return configureServer.call(this, server);
    },
  };
}
