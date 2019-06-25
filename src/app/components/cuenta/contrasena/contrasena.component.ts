import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UsuarioChangePass } from '../../../models/usuario';


@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.component.html',
  styleUrls: ['./contrasena.component.css']
})
export class ContrasenaComponent implements OnInit {
  
  userNameCurrent;
 
  usuarioPass: UsuarioChangePass = {
    userName: '',
    currentpass: '',  
    newpass: '',
    newpassconfirm: ''
  }

  constructor(public auth: AuthService) {
    this.userNameCurrent = this.auth.user;
   }

  ngOnInit() {
  }

  changeContrasena(form: NgForm){
    this.auth.changePass(form.value)
      .subscribe(res=>{
        console.log(res);
      });
  }

}
