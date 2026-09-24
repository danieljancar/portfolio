import type { APIRoute } from 'astro';
import { llmsFull } from '~/lib/llms';

export const GET: APIRoute = ({ site }) =>
  llmsFull(site ?? new URL('https://danieljancar.dev'));
