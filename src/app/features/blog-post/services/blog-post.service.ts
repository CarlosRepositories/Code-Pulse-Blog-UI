import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPost } from '../models/blog-post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UpdateBlogPost } from '../models/update-blog-post-request.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http: HttpClient) { }

  addBlogPost(data: AddBlogPost) : Observable<BlogPost>{
    return this.http.post<BlogPost> (`${environment.appBaseUrl}BlogPost?addAuth=true`, data);
  }

  getAllBlogPosts() : Observable<BlogPost[]>{
    return this.http.get<BlogPost[]> (`${environment.appBaseUrl}BlogPost`);
  }

  getBlogPostById(id: string) : Observable<BlogPost>{
    return this.http.get<BlogPost> (`${environment.appBaseUrl}BlogPost/${id}`);
  }

  getBlogPostByUrlHandle(urlHandle: string) : Observable<BlogPost>{
    return this.http.get<BlogPost> (`${environment.appBaseUrl}BlogPost/${urlHandle}`);
  }

  updateBlogPost(id: string, updateRequestModel: UpdateBlogPost) : Observable<BlogPost>{
    return this.http.put<BlogPost> (`${environment.appBaseUrl}BlogPost/${id}?addAuth=true`,updateRequestModel);
  }

  deleteBlogPost(id: string) : Observable<BlogPost>{
    return this.http.delete<BlogPost>(`${environment.appBaseUrl}BlogPost/${id}?addAuth=true`);
  }
  
}
