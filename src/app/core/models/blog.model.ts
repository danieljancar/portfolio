export interface Author {
  username: string;
  name: string;
  bio: string;
  image: string;
  website: string;
  github: string;
  linkedin: string;
}

export interface Blog {
  slug: string;
  title: string;
  description: string;
  created: string;
  edited: string;
  tags: string[];
  content: string;
  readTime: string;
  banner: string;
  bannerAlt: string;
  bannerSource: string;
  bannerAiGenerated: boolean;
  author: string;
  featured?: boolean;
  githubRepoLink?: string | null;
  stackBlitzLink?: string | null;
  otherSourceLink?: string | null;
}

export interface BlogsJson {
  authors: Author[];
  blogs: Blog[];
}
