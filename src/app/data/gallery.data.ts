export interface GalleryPhoto {
  src: string;
  alt: string;
  caption?: string;
}

const files = [
  'IMG_0923.JPG',
  'IMG_2160.jpeg',
  'IMG_2463.jpeg',
  'IMG_2520.jpeg',
  'IMG_2989.jpeg',
  'IMG_3204.JPG',
  'IMG_3457.jpeg',
  'IMG_3955.jpeg',
  'IMG_4268.jpeg',
  'IMG_4461.jpeg',
  'IMG_4478.jpeg',
  'IMG_4508.jpeg',
  'IMG_4913.jpeg',
  'IMG_4990.jpeg',
  'IMG_5077.jpeg',
  'IMG_5664.JPG',
  'IMG_5819.jpeg',
  'DSCF1102.JPG',
  'DSCF1120.JPG',
  'DSCF1122.JPG',
  'DSCF1139.JPG',
  'DSCF1142.JPG',
  'DSCF1149.JPG',
  'DSCF1158.JPG'

];

export const GALLERY: GalleryPhoto[] = files.map(file => ({
  src: `assets/gallery/${file}`,
  alt: 'Photo taken by Daniel Jancar',
}));
