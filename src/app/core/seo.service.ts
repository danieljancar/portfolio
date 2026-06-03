import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

const SITE_URL = 'https://danieljancar.dev';
const DEFAULT_IMAGE = `${SITE_URL}/assets/images/og.jpg`;

export interface SeoData {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  update(data: SeoData): void {
    const image = data.image ?? DEFAULT_IMAGE;
    const url = `${SITE_URL}${data.path ?? '/'}`;

    this.title.setTitle(data.title);
    this.setTag('name', 'description', data.description);
    this.setTag('property', 'og:title', data.title);
    this.setTag('property', 'og:description', data.description);
    this.setTag('property', 'og:type', data.type ?? 'website');
    this.setTag('property', 'og:url', url);
    this.setTag('property', 'og:image', image);
    this.setTag('name', 'twitter:title', data.title);
    this.setTag('name', 'twitter:description', data.description);
    this.setTag('name', 'twitter:image', image);
    this.setCanonical(url);
  }

  private setTag(
    attr: 'name' | 'property',
    key: string,
    content: string,
  ): void {
    this.meta.updateTag({ [attr]: key, content });
  }

  private setCanonical(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
