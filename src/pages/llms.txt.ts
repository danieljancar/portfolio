import type { APIRoute } from 'astro';
import { llmsSummary } from '~/lib/llms';

export const GET: APIRoute = ({ site }) =>
  llmsSummary(site ?? new URL('https://danieljancar.dev'));
