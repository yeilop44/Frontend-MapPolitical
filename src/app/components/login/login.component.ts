
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
  isLogged: boolean;
  isAlert = false;
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
    this.isLoading = true; 
    this.auth.login(usuario)
      .subscribe((res: any) => { 
                      
        if(this.auth.isLogged){          
          this.user = this.auth.user;                           
          this.isLoading = false; 
          this.router.navigate(['/afiliados']);          
        }else{
          this.isAlert = true;
          this.isLoading = false;           
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
