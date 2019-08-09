import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UsuarioChangePass } from '../../../models/usuario';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.component.html',
  styleUrls: ['./contrasena.component.css']
})
export class ContrasenaComponent implements OnInit {
  
  userNameCurrent;
  isLogged;
  username;
  sessions;
 
  usuarioPass: UsuarioChangePass = {
    userName: '',
    currentpass: '',  
    newpass: '',
    newpassconfirm: ''
  }

  constructor(public auth: AuthService, private router: Router) {
    this.session();    
   }

  ngOnInit() {
  }

  session(){
    this.auth.session()
      .subscribe((res: any) =>{             
        this.isLogged = res.isLogged;
        if(this.isLogged){          
          this.username = res.user.user.userName;
          this.userNameCurrent = this.username;
          this.sessions = res.session;                                       
        }else{          
          this.router.navigate(['login']);
        }
      });
  }

  changeContrasena(form: NgForm){    
    this.auth.changePass(form.value)
      .subscribe((res: any)=>{ 
        let isChanged = res.isChanged;
        if(isChanged){
          alert("contraseña cambiada " + isChanged);
          this.resetForm(form);
        }else{
          alert("contraseña cambiada " + isChanged);
        }        
      });
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();      
    }
  }

}
