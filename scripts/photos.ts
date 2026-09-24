import {
  generatePhotoMeta,
  shrinkOriginals,
} from '../src/integrations/photo-meta/core.ts';

const root = process.cwd();

if (process.argv.includes('--shrink')) {
  const shrunk = await shrinkOriginals(root);
  console.log(`shrunk ${shrunk.length} originals`);
}

const { count, stubs } = await generatePhotoMeta({ root });
console.log(`${count} photos analysed, ${stubs.length} new entries`);
