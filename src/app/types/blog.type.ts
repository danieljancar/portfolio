import { Author } from './author.type';

export type Blog = {
  slug: string;
  title: string;
  description: string;
  edited: string;
  tags: string[];
  content: string;
  created: string;
  readTime: string;
  banner: string;
  bannerAlt: string;
  bannerSource: string;
  bannerAiGenerated: boolean;
  author: string;
  githubRepoLink?: string | null;
  stackBlitzLink?: string | null;
  otherSourceLink?: string | null;
};

export type BlogsJson = {
  name: string;
  description: string;
  authors: Author[];
  blogs: Blog[];
};
