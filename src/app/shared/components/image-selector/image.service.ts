import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlogImage } from './models/blog-Image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  selectedImage: BehaviorSubject<BlogImage> =  new BehaviorSubject<BlogImage>({
    id: '',
    fileExtension: '',
    fileName: '',
    title: '',
    url: ''
  });

  constructor(private htpp: HttpClient) { }

  getAllImages() : Observable<BlogImage[]> {
    return this.htpp.get<BlogImage[]>(`${environment.appBaseUrl}Images`)
  }

  upload(file: File, fileName: string, title: string) : Observable<BlogImage>{
    
    const formData = new FormData();
    formData.append('File', file);
    formData.append('fileName', fileName);
    formData.append('title', title);

    return this.htpp.post<BlogImage>(`${environment.appBaseUrl}Images`, formData);
  }

  selectImage(image:BlogImage) : void{
    this.selectedImage.next(image);
  }

  onSelectImage(): Observable<BlogImage>{
    return this.selectedImage.asObservable();
  }

}
