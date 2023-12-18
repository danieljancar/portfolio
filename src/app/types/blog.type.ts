import { Author } from './author.type';

export type Blog = {
  created: string;
  title: string;
  description: string;
  edited: string;
  tags: string[];
  content: string;
  banner: string;
  bannerAlt: string;
  bannerSource: string;
  author: string;
};

export type BlogsJson = {
  name: string;
  description: string;
  authors: Author[];
  blogs: Blog[];
};
