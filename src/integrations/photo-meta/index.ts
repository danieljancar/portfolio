import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { AstroIntegration } from 'astro';
import { ALBUM_DIR, generatePhotoMeta } from './core';

export default function photoMeta(): AstroIntegration {
  let root = process.cwd();
  return {
    name: 'photo-meta',
    hooks: {
      'astro:config:setup': async ({ config, logger }) => {
        root = fileURLToPath(config.root);
        const count = await generatePhotoMeta({ root, logger });
        logger.info(`palette and camera data ready for ${count} photos`);
      },
      'astro:server:setup': ({ server, logger }) => {
        const dir = path.join(root, ALBUM_DIR);
        let timer: ReturnType<typeof setTimeout> | undefined;
        const refresh = (file: string) => {
          if (!file.startsWith(dir)) return;
          clearTimeout(timer);
          timer = setTimeout(() => {
            generatePhotoMeta({ root, logger }).catch(error =>
              logger.error(String(error)),
            );
          }, 300);
        };
        server.watcher.add(dir);
        server.watcher.on('add', refresh);
        server.watcher.on('change', refresh);
        server.watcher.on('unlink', refresh);
      },
    },
  };
}
