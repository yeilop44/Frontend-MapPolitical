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

  constructor(private affiliateService: AffiliatesService, private auth: AuthService, private router: Router) { 
    if(!this.auth.isLogged){
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.isLoadingLeaders = true;
    this.affiliateService.getAffiliatesByUser(this.auth.user)
      .subscribe((data: any) =>{
        this.afiliados1 = data.Affiliates;
      console.log(this.afiliados1);
      this.afiliadosLeader = _.uniqBy(this.afiliados1, 'leader');
      console.log(this.afiliadosLeader);
      this.isLoadingLeaders = false;
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
