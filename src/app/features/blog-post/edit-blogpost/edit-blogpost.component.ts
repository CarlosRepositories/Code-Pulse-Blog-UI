import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPost } from '../models/blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  id: string | null = null;
  model?: BlogPost;
  paramssubscription?: Subscription;

  constructor(private route: ActivatedRoute,
              private blogPostService: BlogPostService) {

  }
  ngOnInit(): void {
    this.paramssubscription = this.route.paramMap.subscribe({
        next: (params) => {
          this.id = params.get('id')

          if(this.id){
           this.blogPostService.getBlogPostById(this.id).subscribe({
            next:(response) => {
              this.model = response
            }
           });
          }
        }
    })
  }
  
  onFormSubmit(): void{


  }
  
  ngOnDestroy(): void {
    this.paramssubscription?.unsubscribe();
  }

}
