import { Injectable } from '@angular/core';
import blogData from '../data/blog.json';
import { Author, Blog, BlogsJson } from './models/blog.model';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private readonly data = blogData as BlogsJson;

  getBlogs(sort: 'latest' | 'oldest' = 'latest'): Blog[] {
    return [...this.data.blogs].sort((a, b) => {
      const diff =
        new Date(a.created).getTime() - new Date(b.created).getTime();
      return sort === 'latest' ? -diff : diff;
    });
  }

  getBlogBySlug(slug: string): Blog | undefined {
    return this.data.blogs.find(blog => blog.slug === slug);
  }

  getFeaturedBlogs(limit = 2): Blog[] {
    return this.getBlogs('latest')
      .filter(blog => blog.featured)
      .slice(0, limit);
  }

  getAuthor(username: string | undefined): Author | undefined {
    return this.data.authors.find(author => author.username === username);
  }

  getSlugs(): string[] {
    return this.data.blogs.map(blog => blog.slug);
  }
}
