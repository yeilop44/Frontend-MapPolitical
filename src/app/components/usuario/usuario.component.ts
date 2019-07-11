import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AffiliatesService } from '../../services/affiliates.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import * as _ from 'lodash';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  user: Usuario[] = [];
  isLogged: boolean;
  isLoading: boolean = false;
  afiliados: any[] = [];
  afiliadosLeader: any[] = [];
  countAfiliados: number;
  countLideres: number;

  constructor(public auth: AuthService, private affiliateService: AffiliatesService, private router: Router) { 
    this.session();
  }

  ngOnInit() {
  
  }

  session(){
    this.isLoading = true;
    this.auth.session()  
      .subscribe((res: any) =>{          
        this.isLogged = res.isLogged;        
        if(this.isLogged){
          this.user = res.user;  
          this.isLoading = false;
          console.log(this.user);
          let username = res.user.userName;
          this.getAfiliados(username);        
        }else{
          this.router.navigate(['login']);
        }
    });
  }

  getAfiliados(username: string) {
    this.affiliateService.getAffiliatesByUser(username)
      .subscribe((res:any) => {
        this.afiliados = res.affiliates;
        this.countAfiliados = res.count;
        this.afiliadosLeader = _.uniqBy(this.afiliados, 'leader');        
        this.countLideres = this.afiliadosLeader.length;                                        
      });      
  }
}
