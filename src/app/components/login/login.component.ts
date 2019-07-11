
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.js';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  url = 'http://localhost:3000/user';

  isLoading: boolean = false;
  isLogged = false;
  user: any;

  usuario: Usuario = {
    userName: '',
    password: ''
  };
  constructor(public auth: AuthService, public router: Router) {
    this.session()
   }

  ngOnInit() {
  }

  login(usuario: Usuario) {
    //console.log(usuario);    
    this.auth.login(usuario)
      .subscribe((res: any) => { 
        this.isLogged = this.auth.isLogged;        
        if(this.isLogged){
          this.isLoading = true; 
          this.user = this.auth.user;                           
          this.router.navigate(['/afiliados']);
          
        }else{
          alert(this.isLogged);
        }               
      });
  }

  session(){
    this.auth.session()
      .subscribe((res: any) =>{          
        this.isLogged = res.isLogged;        
        if(this.isLogged){
          this.router.navigate(['/afiliados']);
        }else{
          console.log(this.isLogged)
        }
      });
  }


}
