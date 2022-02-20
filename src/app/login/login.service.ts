import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Login } from './models/login.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(login: Login) {
    let params = new HttpParams().set('username', login.username).set('password', login.password);
    console.log(params);

    return this.http.get<Login>('http://localhost:3000/profile', {params: params});
  }
}
