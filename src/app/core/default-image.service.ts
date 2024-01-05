// default-image.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DefaultImageService {
  constructor() {}

  setDefaultImage(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/notFound.webp';
  }
}
