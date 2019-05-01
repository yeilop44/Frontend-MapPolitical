
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.js';
import { AuthService } from './../../services/auth.service';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  url = 'http://localhost:3000/user';

  isLogged = false;
  user: string;

  usuario: Usuario = {
    userName: '',
    password: ''
  };
  constructor(public auth: AuthService, public router: Router) { }

  ngOnInit() {
  }

  login(usuario: Usuario) {
    
    this.auth.login(this.usuario)
      .subscribe(res=>{
  
         if(this.auth.isLogged){
             console.log('is true');
             this.router.navigate(['/inicio']);
         }else{
            console.log('is false');
         }       
      });
  }


}
