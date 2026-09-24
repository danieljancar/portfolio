import { defineHastPlugin } from 'satteri';
import { linkProps } from '../lib/links';

export const externalLinks = defineHastPlugin({
  name: 'external-links',
  element: {
    filter: ['a'],
    visit(node, ctx) {
      const href = node.properties?.href;
      if (typeof href !== 'string') return;
      const { target, rel, href: next } = linkProps(href);
      if (!target || !rel) return;
      ctx.setProperty(node, 'href', next);
      ctx.setProperty(node, 'target', target);
      ctx.setProperty(node, 'rel', rel);
    },
  },
});
