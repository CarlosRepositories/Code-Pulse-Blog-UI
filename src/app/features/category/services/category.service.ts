import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http : HttpClient) { }

  addCategory(model: AddCategoryRequest ) : Observable<void> {
    return this.http.post<void>( `${environment.appBaseUrl}categories?addAuth=true`, model);
  }

  getAllCategories() : Observable<Category[]>{
    return this.http.get<Category[]>(`${environment.appBaseUrl}categories`);
  }

  getCategoryById(id: string): Observable<Category>{
    return this.http.get<Category>(`${environment.appBaseUrl}categories/${id}`);
  }

  updateCategory(id:string, updateCategoryModel: UpdateCategoryRequest): Observable<Category>{

    return this.http.put<Category>(`${environment.appBaseUrl}categories/${id}?addAuth=true`,updateCategoryModel);
  }

  deleteCategory(id:string): Observable<Category>{

    return this.http.delete<Category>(`${environment.appBaseUrl}categories/${id}?addAuth=true`);
  }

}