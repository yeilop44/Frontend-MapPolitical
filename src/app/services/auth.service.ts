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
  token: any;
  userInfo: Usuario[]=[];    

  constructor(private http: HttpClient) {
    
  }

  login(user: Usuario) {
    const httpOptions = {
    headers: new HttpHeaders({'Content-Type':  'application/json', 'Accept': 'application/json'}),  withCredentials: true};
    return this.http.post(`${this.urlApi}/signin`, user, httpOptions)
      .pipe(map((data: any) => {        
        if(data.isLogged){
          this.isLogged = data.isLogged;
            this.user = data.user.user;
            this.token = data.user.token
        }else{
          console.log("error de conexion con el servidor");
        }
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


