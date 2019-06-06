import {Component, ViewChild, OnInit, AfterViewInit, ElementRef} from '@angular/core';
import { AffiliatesService } from '../../services/affiliates.service';
import { ListMasterService } from '../../services/list-master.service';
import { ElectoralMasterService } from '../../services/electoral-master.service';
import { GeographyMasterService } from '../../services/geography-master.service';
import { DivipolMasterService } from '../../services/divipol-master.service';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Afiliado } from '../../models/afiliado';
import { Router } from '@angular/router';
import {} from 'googlemaps';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalCargaMasivaComponent} from './modal-carga-masiva/modal-carga-masiva.component';
import { ModalDirective } from 'ngx-bootstrap/modal';




@Component({
  selector: 'app-afiliados',
  templateUrl: './afiliados.component.html',
  styleUrls: ['./afiliados.component.css']
})
export class AfiliadosComponent implements OnInit, AfterViewInit, OnDestroy   {
  
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('search') public searchElement: any;
  @ViewChild('modalCargaMasiva') modalCargaM: ModalCargaMasivaComponent;
  @ViewChild('infoContactoModal') public infoContactoModal: ModalDirective;
  map: google.maps.Map;

  mapPro: google.maps.Map;
  marker: any;

  lat = 6.231928;
  lng = -75.60116719999996;
  places: any;
  bounds: any;
  searchBox: any;
    
  isNewAffiliate: boolean = false;
  isLoading: boolean = false;
  isDisabledButton: boolean = false;
  isMap: boolean  = false;
  isEmptyFields: boolean  = false;
  isEmptyBirthdate = false;
  isEmptyNames = false;
  isEmptySurnames = false;
  isEmptyIdentification = false;
  
  affiliates: any[] = [];
  divipols: any[] = [];
  states: any[] = [];
  municipalitys: any[] = [];
  subdivisions: any[] = []; 
  geographys: any[] = [];
  electorals: any[] = [];
  votingStations: any[] = [];
  votingTables: any[] = [];
  votingPlaces: any[] = [];
  professions: any[] = [];
  ocupations: any[] = [];
  sexs: any[] = [];
  churchs: any[] = [];
  userNameCurrent;
  numberTables: number = 0;


  constructor(private affiliateService: AffiliatesService, public auth: AuthService, 
              private listMaster: ListMasterService, private electoralMasterService: ElectoralMasterService,
              private geographyMasterService: GeographyMasterService, 
              private divipolMasterService: DivipolMasterService, private router: Router) { 
              private router: Router, private modalService: NgbModal) {
    if(!this.auth.isLogged){
      this.router.navigate(['/login']);
    }
    this.userNameCurrent = this.auth.user;
    console.log(this.userNameCurrent);    
  }

  ngOnInit() {
    this.getAfiliados();      
  }

  ngMaps(){
    console.log("afterinit");
    setTimeout(() => {
      let mapProp = {
        center: new google.maps.LatLng(4.2223, -74.3333),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(this.mapElement.nativeElement, mapProp);
  
        var marker = new google.maps.Marker({
          position: {lat: 4.2223, lng: -74.3333},
          map: map,
          draggable: true
        });  
  
        var searchBox = new google.maps.places.SearchBox(this.searchElement.nativeElement);
      
        google.maps.event.addListener(searchBox, 'places_changed', () => {
          var places = searchBox.getPlaces();
          var bounds = new google.maps.LatLngBounds();
          var i, place;
          console.log(places[0].formatted_address);
          console.log(places[0].geometry.location.lat());
          console.log(places[0].geometry.location.lng());
          var positionLat = places[0].geometry.location.lat();
          var positionLng = places[0].geometry.location.lng();          
          console.log(bounds);
          /*for ( i = 0 ;  place = places[i]; i++) {
            bounds.extend(place.geometry.location);
            marker.setPosition(place.geometry.location);
          }*/

          bounds.extend(places[0].geometry.location);
          marker.setPosition(places[0].geometry.location);
          map.fitBounds(bounds);
          map.setZoom(14);  
          this.affiliateService.selectedAfiliado.positionLat = positionLat;
          this.affiliateService.selectedAfiliado.positionLng = positionLng;
        });
    }, 500);    
  }

  ngAfterViewInit(){
    
  }

  getAfiliados() {
    this.isLoading = true;
    this.affiliateService.getAffiliatesByUser(this.auth.user)
    .subscribe((data: any ) => {
      this.affiliates = data.Affiliates;
      console.log(this.affiliates);
      this.isLoading = false;
    });     
  }

  addAfiliado(form: NgForm) {
    if(this.affiliateService.selectedAfiliado.birthdate == (null || "") || 
        this.affiliateService.selectedAfiliado.names == (null || "") ||
        this.affiliateService.selectedAfiliado.surnames == (null || "") ||
        this.affiliateService.selectedAfiliado.identification == (0)|| null) {
          
          this.isEmptyFields = true;
          console.log("datos basicos vacios");
      if(this.affiliateService.selectedAfiliado.birthdate == (null || "") ) {
        this.isEmptyBirthdate = true;
      }else{
        this.isEmptyBirthdate = false;
      } 
      if(this.affiliateService.selectedAfiliado.names == (null || "")) {
        this.isEmptyNames = true;
      }else {
        this.isEmptyNames = false;
      }
      if(this.affiliateService.selectedAfiliado.surnames == (null || "")) {
        this.isEmptySurnames = true;
      }else {
        this.isEmptySurnames = false;
      }    
      if(this.affiliateService.selectedAfiliado.identification == (null || 0)){
        this.isEmptyIdentification = true;
      }else {
        this.isEmptyIdentification = false;
      }                
    } else {
      this.isDisabledButton = true;
      if (form.value._id) {
        this.affiliateService.putAfiliado(form.value)
          .subscribe(res => {          
            console.log(res);
            console.log('Affiliate Updated');
            this.getAfiliados();
            this.isNewAffiliate = false;
          });
        //this.resetForm(form);        
      } else {      
         this.affiliateService.postAfiliado(form.value)
          .subscribe(res => {
          console.log('Affiliate Saved');
          this.getAfiliados();
          this.isNewAffiliate = false;
        });     
      }
      this.isEmptyFields = false;
      this.isEmptyBirthdate = false;
      this.isEmptyNames = false;
      this.isEmptySurnames = false;
      this.isEmptyIdentification = false;
    }     
  }

  editAfiliado(afiliado: Afiliado) {
    this.affiliateService.selectedAfiliado = afiliado;
    this.isNewAffiliate = true;
    //this.ngMaps();
    this.getProfessions(event);
    this.getOcupations(event);
    this.getChurchs(event);
    this.getSexs(event);
    this.isDisabledButton = false;
  }

  deleteAfiliado(_id: string) {
    if (confirm('Esta seguro de Eliminar este afiliado?')) {
      this.affiliateService.deleteAfiliado(_id)
        .subscribe(res => {
        console.log('Affiliate deleted');
        this.getAfiliados();
      });
    }
  }
  
  getDivipolInfo() {   
    this.divipolMasterService.getDivipolMasters()
      .subscribe((data: any)=>{
        console.log(data.Items);
        this.divipols = data.Items;        
        for(let i=0; i<this.divipols.length;i++){
            this.states[i] = this.divipols[i].state;            
        }
        console.log(this.states);                    
      }); 
  }
  
  onOptionsSelectedState(value: string){
    this.affiliateService.selectedAfiliado.municipality = ''; 
    this.municipalitys = [];  
    for(let i=0;i<this.divipols.length;i++){
      if(value == this.divipols[i].state){      
        for(let j=0;j<this.divipols[i].municipality.length; j++){
          this.municipalitys[j] = this.divipols[i].municipality[j];    
        }               
      }      
    }    
  }

  getGeographyInfo() {   
    this.geographyMasterService.getGeographyMasterByUser(this.auth.user)
      .subscribe((data: any)=>{
        this.geographys = data.Items;
        console.log(this.geographys);      
      }); 
  }

  onOptionsSelectedMunicipality(value: string){
    this.affiliateService.selectedAfiliado.zone = '';
    this.affiliateService.selectedAfiliado.subdivision = '';
    this.affiliateService.selectedAfiliado.votingStation = '';
    this.affiliateService.selectedAfiliado.votingPlace = '';
    this.affiliateService.selectedAfiliado.votingTable = '';
    this.subdivisions = [];
    this.votingStations = [];
    this.votingTables = [];
    var votingStations1 = [];
    

    for(let i=0;i<this.electorals.length;i++){
      if(value == this.electorals[i].municipality &&
        this.affiliateService.selectedAfiliado.state == this.electorals[i].state){                  
          votingStations1[i] = this.electorals[i].votingStation;              
      }      
    } 
    this.votingStations = votingStations1.filter(() => {return true});



  }

  onOptionsSelectedZone(value: string){
    this.affiliateService.selectedAfiliado.subdivision = '';
    var subdivisions1 = [];
    for(let i=0;i<this.geographys.length;i++){
      if(value == this.geographys[i].zone &&
        this.affiliateService.selectedAfiliado.state == this.geographys[i].state &&
        this.affiliateService.selectedAfiliado.municipality == this.geographys[i].municipality){        
          subdivisions1[i] = this.geographys[i].subdivision;        
      }      
    }   
    console.log(this.affiliateService.selectedAfiliado.state);
    console.log(this.affiliateService.selectedAfiliado.municipality);
    console.log(this.affiliateService.selectedAfiliado.zone);    
    this.subdivisions = subdivisions1.filter(() => {return true});
  }

  
  
  getElectoralInfo() {   
    this.electoralMasterService.getElectoralMastersByUser(this.auth.user)
    .subscribe((data: any ) => {       
      this.electorals = data.Items;           
    }); 
  }

  onOptionsSelectedStation(value: string){
    this.affiliateService.selectedAfiliado.votingTable = '';
    this.votingTables = [];
    for(let i=0;i<this.electorals.length;i++){
      if(value == this.electorals[i].votingStation){
        this.affiliateService.selectedAfiliado.votingPlace = this.electorals[i].votingPlace;
          this.numberTables = this.electorals[i].numberTables;        
      }      
    }
    for(let i=0; i<this.numberTables; i++){
      this.votingTables[i] = "Mesa " + (i+1) ;
    }     
  }

  getProfessions(event) { 
    var arr1: any[] = [];
    this.listMaster.getListMasters()
    .subscribe((data: any ) => { 
      for(let i=0; i<data.Items.length;i++){
        if(data.Items[i].type == "Profesión"){
          arr1[i] = data.Items[i].name;          
        }
      }
      console.log(arr1);
      this.professions = arr1.filter( function() { return true });
      console.log(this.professions);      
    }); 
  }

  getOcupations(event) { 
    var arr: any[] = [];
    this.listMaster.getListMasters()
    .subscribe((data: any ) => { 
      for(let i=0; i<data.Items.length;i++){
        if(data.Items[i].type == "Ocupación"){
          arr[i] = data.Items[i].name;          
        }
      }
      console.log(arr);      
      this.ocupations = arr.filter( () => { return true });
      console.log(this.ocupations);       
    });     
  }

  getChurchs(event) { 
    var arr: any[] = [];
    this.listMaster.getListMasters()
    .subscribe((data: any ) => { 
      for(let i=0; i<data.Items.length;i++){
        if(data.Items[i].type == "Religión"){
          arr[i] = data.Items[i].name;          
        }
      }
      console.log(arr);      
      this.churchs = arr.filter( () => { return true });
      console.log(this.churchs);       
    });     
  }

  getSexs(event) { 
    var arr: any[] = [];
    this.listMaster.getListMasters()
    .subscribe((data: any ) => { 
      for(let i=0; i<data.Items.length;i++){
        if(data.Items[i].type == "Sexo"){
          arr[i] = data.Items[i].name;          
        }
      }
      console.log(arr);      
      this.sexs = arr.filter( () => { return true });
      console.log(this.sexs);       
    });     
  }


  //clean the form
  resetForm(form?: NgForm){
  	if(form){
  		form.reset();
      this.affiliateService.selectedAfiliado = new Afiliado();
      this.userNameCurrent = this.auth.user;
      console.log(this.userNameCurrent);
  	}
  }

  NewAffiliate(form: NgForm) {
    this.isNewAffiliate = true;
    this.resetForm(form);
    this.affiliateService.selectedAfiliado._id = null;
    //this.ngMaps();
    this.getProfessions(event);
    this.getOcupations(event);
    this.getChurchs(event);
    this.getSexs(event);
    this.getElectoralInfo(); 
    this.getGeographyInfo();
    this.getDivipolInfo();   
    this.isDisabledButton = false;
  }

  cancelar(form: NgForm) {
    this.isNewAffiliate = false;
    this.resetForm(form);
    this.getAfiliados();    
  }

  ngOnDestroy(){
    this.affiliateService.selectedAfiliado = new Afiliado();
  }


}
