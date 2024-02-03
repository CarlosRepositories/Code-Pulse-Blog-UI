import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPost } from '../models/blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { UpdateBlogPost } from '../models/update-blog-post-request.model';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  id: string | null = null;
  model?: BlogPost;
  paramssubscription?: Subscription;  
  categories$?: Observable<Category[]>;
  selectedCategories?: string[];
  updateBlogPostSubscription?: Subscription;
  getBlogPostSubscription?: Subscription;
  deleteBlogPostSubscription?: Subscription;
  showImageSelector: boolean = false;

  constructor(private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private categoryService: CategoryService,
    private router: Router) {

  }
  ngOnInit(): void {

    this.categories$ = this.categoryService.getAllCategories();

    this.paramssubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id')

        if (this.id) {
          this.getBlogPostSubscription = this.blogPostService.getBlogPostById(this.id).subscribe({
            next: (response) => {
              this.model = response
              this.selectedCategories = response.categories.map(x => x.id);
            }
          });
        }
      }
    })
  }

  onFormSubmit(): void {

    if(this.model && this.id){

      var updateRequestModel: UpdateBlogPost = {
        title : this.model?.title,
        shortDescription : this.model?.shortDescription,
        content : this.model?.content,    
        featuredImageUrl : this.model?.featuredImageUrl,
        urlHandle : this.model?.urlHandle,
        publishedDate : this.model?.publishedDate,
        author : this.model?.author,
        isVisible : this.model?.isVisible,
        categories : this.selectedCategories
      };

      this.updateBlogPostSubscription = this.blogPostService.updateBlogPost(this.id, updateRequestModel).subscribe({
        next: (response) => {
          this.router.navigateByUrl('admin/blogposts')
        }
      });
    }
  }

  OnDelete() : void{
    if(this.id){
      this.deleteBlogPostSubscription =  this.blogPostService.deleteBlogPost(this.id).subscribe({
        next: (response) =>{
          this.router.navigateByUrl('admin/blogposts')
        }
      })
    }

  }

  OpenImageSelector() : void{
    this.showImageSelector = true    

  }

  CloseImageSelector() : void{
    this.showImageSelector = false
  }

  ngOnDestroy(): void {
    this.paramssubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
  }

}
