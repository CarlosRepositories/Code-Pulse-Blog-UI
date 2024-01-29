import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';

@Component({
  selector: 'app-blogpost-add',
  templateUrl: './blogpost-add.component.html',
  styleUrls: ['./blogpost-add.component.css']
})
export class BlogpostAddComponent implements OnDestroy, OnInit{

  model: AddBlogPost;
  private addBlogPostSubscription ?: Subscription;
  categories$ ?: Observable<Category[]>;

  constructor(private blogPostService: BlogPostService,
              private router: Router,
              private categorySevice: CategoryService){

    this.model = {
      title: '',
      shortDescription:'',
      content: '',
      featuredImageUrl: '',
      urlHandle: '',
      publishedDate: new Date(),
      author: '',
      isVisible: true,
      categories: []
    }
  }
  ngOnInit(): void {    
    this.categories$ = this.categorySevice.getAllCategories();
  }

  onFormSubmit() : void{
    console.log(this.model)
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