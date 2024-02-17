import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  Login(request: LoginRequest) : Observable<LoginResponse>{
    return this.http.post<LoginResponse> (`${environment.appBaseUrl}Auth/login`, {
      email: request.email,
      password: request.password
    });
  }
}
