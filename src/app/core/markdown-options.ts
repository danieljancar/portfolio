import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';

/**
 * Turns heading text into a GitHub-style anchor slug, e.g.
 * "Setting up the CI/CD" -> "setting-up-the-ci-cd".
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

/** Inline "arrow outward" icon appended to external links (Bootstrap arrow-up-right). */
const EXTERNAL_LINK_ICON =
  '<svg class="external-link-icon" viewBox="0 0 16 16" width="0.8em" ' +
  'height="0.8em" fill="currentColor" aria-hidden="true">' +
  '<path fill-rule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793' +
  'L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"/></svg>';

/**
 * Custom marked renderer so every heading rendered by ngx-markdown gets a
 * stable `id`. This makes in-post links like `[Jump](#the-heading)` work and
 * adds a hover "#" permalink anchor next to each heading (à la GitHub docs).
 */
export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.heading = function (this: MarkedRenderer, { tokens, depth }) {
    const content = this.parser.parseInline(tokens);
    const id = slugify(content.replace(/<[^>]+>/g, ''));
    return (
      `<h${depth} id="${id}">` +
      `<a href="#${id}" class="heading-anchor" aria-label="Link to this section">#</a>` +
      `${content}` +
      `</h${depth}>\n`
    );
  };

  renderer.link = function (this: MarkedRenderer, { href, title, tokens }) {
    const text = this.parser.parseInline(tokens);
    const titleAttr = title ? ` title="${title}"` : '';
    // External links (absolute http/https) open in a new tab and get an arrow
    // icon; in-page (#…) and relative links are left as plain links.
    if (!/^https?:\/\//i.test(href)) {
      return `<a href="${href}"${titleAttr}>${text}</a>`;
    }
    return (
      `<a href="${href}"${titleAttr} target="_blank" rel="noopener noreferrer" ` +
      `class="external-link">${text}${EXTERNAL_LINK_ICON}</a>`
    );
  };

  return { renderer };
}
