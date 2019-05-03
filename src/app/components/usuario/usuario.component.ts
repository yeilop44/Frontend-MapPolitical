import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  User: Usuario[] = [];

  constructor(public auth: AuthService, private router: Router) { 
    if(!this.auth.isLogged){
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    this.auth.getUserSettings(this.auth.user)
      .subscribe((data:any) =>{
        this.User = data.User[0];
        console.log(this.User);
      });
  }


}
