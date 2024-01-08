import * as blogData from '../../assets/blog/blog.json';
import { Injectable } from '@angular/core';
import { Author } from '../types/author.type';
import { BlogsJson } from '../types/blog.type';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private authors: Author[] = (blogData as BlogsJson).authors;
  private blogs: BlogsJson['blogs'] = (blogData as BlogsJson).blogs;

  getAuthor(username: string | undefined): Author | undefined {
    return this.authors.find(author => author.username === username);
  }

  getBlogBySlug(slug: string): BlogsJson['blogs'][number] | undefined {
    return this.blogs.find(blog => blog.slug === slug);
  }
}
