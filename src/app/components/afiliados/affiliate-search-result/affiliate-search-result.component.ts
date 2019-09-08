import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AffiliatesService } from '../../../services/affiliates.service';

@Component({
  selector: 'app-affiliate-search-result',
  templateUrl: './affiliate-search-result.component.html'
})
export class AffiliateSearchResultComponent implements OnInit {

  contactResultList: any[] = [{
    nombre: "Mark Antony",
    cedula: 12012255,
    telefono: 1245887,
    cumpleanios:"10-05-1989",
    barrio: "el prado",
    mesaVotacion: "mesa 1",
    lider: "Jonathan Vëlez"
  },
  {
    nombre: "Mark Buffalo",
    cedula: 12012255,
    telefono: 1245887,
    cumpleanios:"10-05-1989",
    barrio: "el prado",
    mesaVotacion: "mesa 1",
    lider: "Jonathan Vëlez"
  }];
  
  searchCriteria:string;

  constructor( private _activatedRoute: ActivatedRoute, private _affiliateService: AffiliatesService ) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe( params => {
      console.log("Estoy en el componente");
      console.log(params['searchCriteria']);
      this.searchCriteria = params['searchCriteria'];
      //this.contactResultList = this._affiliateService.searchContacts( this.searchCriteria );
    } )
  }

}
