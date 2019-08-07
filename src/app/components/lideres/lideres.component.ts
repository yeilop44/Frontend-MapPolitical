import { Component, OnInit } from '@angular/core';
import { AffiliatesService } from '../../services/affiliates.service';
import { AuthService } from '../../services/auth.service';
import { Afiliado } from '../../models/afiliado';
import { Router } from '@angular/router';
import * as _ from 'lodash';


@Component({
  selector: 'app-lideres',
  templateUrl: './lideres.component.html',
  styleUrls: ['./lideres.component.css']
})

export class LideresComponent implements OnInit {

  afiliados1: Afiliado[] = [];
  afiliadosLeader: Afiliado[] = [];
  references: Afiliado[] = [];

  isLoadingLeaders = false;
  isLoadingReferences = false;
  leader: Afiliado;
  isLogged: boolean;
  user: any;
  constructor(private affiliateService: AffiliatesService, private auth: AuthService, private router: Router) { 
   this.session();
  }

  ngOnInit() {
          
  }

  session(){
    this.auth.session()
      .subscribe((res: any) =>{     
        console.log(res);     
        this.isLogged = res.isLogged;
        if(this.isLogged){
          console.log(this.isLogged);
          this.user = res.user;           
          console.log("auth " + this.user.userName); 
          this.getLideres(this.user.userName);                                                                           
        }else{
          console.log(this.isLogged);
          this.router.navigate(['login']);
        }
      });
  }

  getLideres(username: string){
    this.isLoadingLeaders = true;
    this.affiliateService.getAffiliatesByUser(username)
      .subscribe((data: any) =>{
        this.afiliados1 = data.affiliates;
        console.log(this.afiliados1);
        this.afiliadosLeader = _.uniqBy(this.afiliados1, 'leader');
        console.log(this.afiliadosLeader);
        this.isLoadingLeaders = false;
        this.leader =  this.afiliadosLeader[0];
        this.isLoadingReferences = true;
        console.log(this.leader.userName);           
        this.affiliateService.getAffiliatesByLeader(this.leader)
          .subscribe((data: any) =>{  
          this.references = data.Affiliates;
          console.log(this.references); 
          this.isLoadingReferences = false;
        });           
    }); 
  }
     
  verLeader(leader: Afiliado) { 
    this.isLoadingReferences = true;
    console.log(leader);
    this.affiliateService.getAffiliatesByLeader(leader)
      .subscribe((data: any) =>{  
        this.references = data.Affiliates;
        console.log(this.references); 
        this.isLoadingReferences = false;
    });
  }
  
}
