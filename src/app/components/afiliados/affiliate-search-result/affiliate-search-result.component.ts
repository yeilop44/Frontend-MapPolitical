import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AffiliatesService } from '../../../services/affiliates.service';

@Component({
  selector: 'app-affiliate-search-result',
  templateUrl: './affiliate-search-result.component.html',
  styleUrls: ['./affiliate-search-result.component.css']
})
export class AffiliateSearchResultComponent implements OnInit {

  contactResultList: any[];
  searchCriteria:string;

  constructor( private _activatedRoute: ActivatedRoute, private _affiliateService: AffiliatesService ) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe( params => {
      console.log(params['searchCriteria']);
      this.searchCriteria = params['searchCriteria'];
      //this.contactResultList = this._affiliateService.searchContacts( this.searchCriteria );
    } )
  }

}
