import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Usuario, UsuarioChangePass } from '../models/usuario';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlApi = 'https://back-mpolitical.herokuapp.com/user';
  isLogged: any;
  user: any;
  userInfo: Usuario[]=[];    

  constructor(private http: HttpClient) {
    
  }

  login(user: Usuario) {
    const httpOptions = {
    headers: new HttpHeaders({'Content-Type':  'application/json', 'Accept': 'application/json'}),  withCredentials: true};
    return this.http.post(`${this.urlApi}/signin`, user, httpOptions)
      .pipe(map((data: any) => {
        console.log(data);
        if(data.ok){
          this.isLogged = data.ok;
            this.user = user.userName;
            //console.log(data);
            //console.log(this.user);
        }else{
          //console.log("error"+data.ok);
        }
      }));
  }

  logout() {
    this.isLogged = false;
    console.log('Logout');
  }
  
  //Obtiene user para componete Login
  getUser(user: string){
    return this.http.get(`${this.urlApi}/${user}`)
      .pipe(map((data: any)=>{
        this.userInfo = data.User[0];
        console.log(this.userInfo);
      }));
  }
  
  //Obtiene user para componente Usuario y Mapa
  getUserSettings(user: string){
    return this.http.get(`${this.urlApi}/${user}`);
  }

  changePass(user: UsuarioChangePass){
    return this.http.post(`${this.urlApi}/changepass`, user);
  }

}


