import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { BlogpostAddComponent } from './features/blog-post/blogpost-add/blogpost-add.component';
import { EditBlogpostComponent } from './features/blog-post/edit-blogpost/edit-blogpost.component';
import { HomeComponent } from './features/public/home/home.component';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';
import { LoginComponent } from './features/auth/login/login.component';

const routes: Routes = [  
  {
    path:'blog/:url',
    component: BlogDetailsComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
  path: 'admin/categories',
  component: CategoryListComponent
  },
  {
    path: 'admin/categories/add',
    component: AddCategoryComponent
  },
  {
    path: 'admin/categories/:id',    
    component: EditCategoryComponent
  },
  {
    path: 'admin/blogposts',
    component: BlogpostListComponent
  },
  {
    path: 'admin/blogposts/add',
    component: BlogpostAddComponent
  },
  {
    path: 'admin/blogposts/:id',
    component: EditBlogpostComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
