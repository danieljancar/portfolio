import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DefaultImageService {
  constructor() {}

  /**
   * Sets the default image for a broken image. Can be imported as a service and used in any component.
   * @param event
   *
   * @example
   * <img
   *  [src]="image"
   *  (error)="setDefaultImage($event)"
   *  alt="Alternative image, resembling an AI generated image of a 404 and gray like not found page."
   *  />
   */
  setDefaultImage(event: Event) {
    const imgElement: HTMLImageElement = event.target as HTMLImageElement;
    const alt: string =
      'Alternative image, resembling an AI generated image of a 404 and gray like not found page.';
    imgElement.src = 'assets/images/notFound.webp';
    imgElement.alt = alt;
  }
}
