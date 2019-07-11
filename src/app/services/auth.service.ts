import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Usuario, UsuarioChangePass } from '../models/usuario';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlApi = 'http://localhost:3000/user';
  //urlApi = 'https://back-mpolitical.herokuapp.com/user';
  isLogged: any;
  user: any;
  userInfo: Usuario[]=[];    

  constructor(private http: HttpClient) {
    
  }

  login(user: Usuario) {
    const httpOptions = {
    headers: new HttpHeaders({'Content-Type':  'application/json', 'Accept': 'application/json'})};

    return this.http.post(`${this.urlApi}/signin`, user, { withCredentials: true })
      .pipe(map((data: any) => {
        this.isLogged = data.isLogged;
        this.user = data.user;
      }));
  }
  
  session(){
    return this.http.get(`${this.urlApi}/session`, { withCredentials: true });
  }

  logout() {
    return this.http.post(`${this.urlApi}/logout`, {}, { withCredentials: true });
  }
    
  //Obtiene user para componente Usuario y Mapa
  getUserSettings(user: string){
    return this.http.get(`${this.urlApi}/${user}`);
  }

  changePass(user: UsuarioChangePass){
    return this.http.post(`${this.urlApi}/changepass`, user);
  }



}


