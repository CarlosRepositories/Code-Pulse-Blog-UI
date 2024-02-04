import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlogImage } from './models/blog-Image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private htpp: HttpClient) { }

  upload(file: File, fileName: string, title: string) : Observable<BlogImage>{
    
    const formData = new FormData();
    formData.append('File', file);
    formData.append('fileName', fileName);
    formData.append('title', title);

    return this.htpp.post<BlogImage>(`${environment.appBaseUrl}Images`, formData);
  }

}
