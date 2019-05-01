import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlApi = 'https://back-mpolitical.herokuapp.com/user/signin';
  isLogged: any;
  user: any;

  constructor(private http: HttpClient) { }

  login(user: Usuario) {
    const httpOptions = {
    headers: new HttpHeaders({'Content-Type':  'application/json', 'Accept': 'application/json'})};

    return this.http.post(this.urlApi, user, httpOptions)
      .pipe(map((data: any) => {
            this.isLogged = data.ok;
            this.user = user.userName;
            console.log(data);
            console.log(this.user);
      }));
  }

  logOut() {
    this.isLogged = false;
    console.log('Logout');
  }

}


