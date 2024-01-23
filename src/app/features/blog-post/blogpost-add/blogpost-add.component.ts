import { Component, OnDestroy } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blogpost-add',
  templateUrl: './blogpost-add.component.html',
  styleUrls: ['./blogpost-add.component.css']
})
export class BlogpostAddComponent implements OnDestroy{

  model: AddBlogPost;
  private addBlogPostSubscription ?: Subscription;

  constructor(private blogPostService: BlogPostService,
              private router: Router){

    this.model = {
      title: '',
      shortDescription:'',
      content: '',
      featuredImageUrl: '',
      urlHandle: '',
      publishedDate: new Date(),
      author: '',
      isVisible: true      
    }
  }

  onFormSubmit() : void{
    this.addBlogPostSubscription = this.blogPostService.addBlogPost(this.model).subscribe({
      next: (response) =>{
        this.router.navigateByUrl('admin/blogposts');
      }
    })
  }

  ngOnDestroy(): void {
    this.addBlogPostSubscription?.unsubscribe();
  }
}