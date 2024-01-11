import * as blogData from '../../assets/blog/blog.json';
import { Injectable } from '@angular/core';
import { Author } from '../types/author.type';
import { Blog, BlogsJson } from '../types/blog.type';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private authors: Author[] = (blogData as BlogsJson).authors;
  private blogs: BlogsJson['blogs'] = (blogData as BlogsJson).blogs;
  private tags: string[] = (blogData as BlogsJson).sidebar.recommendedTags;

  getFilteredBlogs(filter: string, startIndex: number, count: number): Blog[] {
    let filteredBlogs = this.blogs;

    switch (filter) {
      case 'latest':
        filteredBlogs = this.getBlogsSortedByDate(false);
        break;
      case 'oldest':
        filteredBlogs = this.getBlogsSortedByDate(true);
        break;
    }

    return filteredBlogs.slice(startIndex, startIndex + count);
  }

  getBlogsSortedByDate(ascending: boolean): Blog[] {
    return this.blogs.sort((a, b) => {
      const dateA = new Date(a.created);
      const dateB = new Date(b.created);
      return ascending
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });
  }

  getAuthor(username: string | undefined): Author | undefined {
    return this.authors.find(author => author.username === username);
  }

  getBlogBySlug(slug: string): BlogsJson['blogs'][number] | undefined {
    return this.blogs.find(blog => blog.slug === slug);
  }

  getRecommendedTags(): string[] {
    return this.tags;
  }
}
