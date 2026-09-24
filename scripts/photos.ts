import {
  cleanOriginals,
  generatePhotoMeta,
} from '../src/integrations/photo-meta/core.ts';

const root = process.cwd();

if (process.argv.includes('--clean')) {
  const cleaned = await cleanOriginals(root);
  console.log(
    `cleaned ${cleaned.length} photos: ${cleaned.join(', ') || 'none needed'}`,
  );
}

const count = await generatePhotoMeta({ root });
console.log(`${count} photos analysed`);
