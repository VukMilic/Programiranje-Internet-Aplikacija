import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  login(username, password){
    localStorage.setItem('token', 'admin');

    let data = {
      username: username,
      password: password
    }

    return this.http.post('http://127.0.0.1:4000/admin/login', data)
  }
}
