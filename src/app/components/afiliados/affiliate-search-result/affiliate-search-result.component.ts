import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AffiliatesService } from '../../../services/affiliates.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-affiliate-search-result',
  templateUrl: './affiliate-search-result.component.html'
})
export class AffiliateSearchResultComponent {

  isLogged: boolean;
  user: any;
  isLoading = false;

  contactResultList: any[];
  
  searchCriteria:string;

  constructor( private _auth: AuthService, 
                private _activatedRoute: ActivatedRoute,
                private _router: Router,
                private _affiliateService: AffiliatesService ) {
                  this.session();
                }

  search() {
    this.isLoading = true;
    this._activatedRoute.params.subscribe( params => {
      this.searchCriteria = params['searchCriteria'];
      this._affiliateService.searchContactsByUser(this.user.user.userName, this.searchCriteria ).subscribe((data: any ) => {
        //this.contactResultList = data.affiliates;
        //this.isLoading = false;
        //this.pager = data.pager;
        this.contactResultList = data.pageOfItems;
        this.isLoading = false;
        console.log(JSON.stringify(this.contactResultList));
      });
    } )
  }

  session(){
    this._auth.session()
      .subscribe((res: any) =>{                  
        this.isLogged = res.isLogged;
        if(this.isLogged){          
          this.user = res.user;
          this._auth.token = res.user.token; 
          this.search();
        }else{        
          this._router.navigate(['login']);
        }
    });
  }

}
