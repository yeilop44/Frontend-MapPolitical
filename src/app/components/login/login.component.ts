
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
  user: string;

  usuario: Usuario = {
    userName: '',
    password: ''
  };
  constructor(public auth: AuthService, public router: Router) { }

  ngOnInit() {
  }

  login(usuario: Usuario) {
    this.isLoading = true;

    this.auth.login(this.usuario)
      .subscribe(res=>{
        console.log(this.auth.user);
        this.isLoading = false;
         if(this.auth.isLogged){
            console.log('is true');
            this.router.navigate(['/afiliados']);
            this.auth.getUser(this.auth.user)
              .subscribe((data:any) =>{
                console.log(this.auth.userInfo);
            });
         }else{
          this.router.navigate(['/login']);
            console.log('is false');
         }               
      });
  }


}
