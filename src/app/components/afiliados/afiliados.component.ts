import {Component, ViewChild, OnInit,AfterViewInit, ElementRef, OnDestroy, NgZone } from '@angular/core';
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
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { ModalCargaMasivaComponent } from './modal-carga-masiva/modal-carga-masiva.component';
import { ModalDetalleContactoComponent } from './modal-detalle-contacto/modal-detalle-contacto.component';
import { subscribeOn } from 'rxjs/operators';
import {BsModalRef, BsModalService, ModalDirective} from 'ngx-bootstrap/modal';
import {NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { ListMaster } from 'src/app/models/listMaster';

@Component({
  selector: 'app-afiliados',
  templateUrl: './afiliados.component.html',
  styleUrls: ['./afiliados.component.css'],
   providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class AfiliadosComponent implements OnInit, AfterViewInit, OnDestroy {
 
  @ViewChild('map') mapElement: ElementRef;
  //@ViewChild('search') public searchElement: ElementRef;
  @ViewChild('search') public searchElementRef: ElementRef;
  @ViewChild('modalCargaMasiva') modalCargaM: ModalCargaMasivaComponent;
  @ViewChild('infoContactoModal') public infoContactoModal: ModalDirective;
  map: google.maps.Map;

  mapPro: google.maps.Map;
  marker: any;

  modalReference: NgbModalRef;


  lat = 6.231928;
  lng = -75.60116719999996;
  places: any;
  bounds: any;
  searchBox: any;
  pager = {};
  pageOfItems = [];

  isNewAffiliate = false;
  isLoading = false;
  isDisabledButton = false;
  isMap  = false;
  isEmptyFields  = false;
  isEmptyBirthdate = false;
  isEmptyNames = false;
  isEmptySurnames = false;
  isEmptyIdentification = false;

  affiliates: any;
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
  
  professionsList: ListMaster[] = [];
  ocupationList: any[] = [];
  religionList: any[] = [];
  genderList: any[] = [];

  ocupations: any[] = [];
  sexs: any[] = [];
  churchs: any[] = [];  
  numberTables = 0;
  isLogged;
  username;
  sessions;
  userNameCurrent;
  

  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom:number;
  address: string;
  private geoCoder;
  bsModalRef: BsModalRef;
  bsModalRefTres: BsModalRef;

  globalSearchCriteria:string = "";

  user: any;
  isFilter = false;
  subdivisionByZoneFilter: any[] = [];
  professionByZoneFilter: any[] = [];
  count = 0;
  temp: any;
  temp2: any;
  subdivisionParameter: any;
  
  
  constructor(public affiliateService: AffiliatesService, public auth: AuthService,
              private listMaster: ListMasterService, private electoralMasterService: ElectoralMasterService,
              private geographyMasterService: GeographyMasterService, private divipolMasterService: DivipolMasterService, 
              private router: Router, private modalService: NgbModal, private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone, private modalServiceDos: BsModalService, private modalServiceTres: BsModalService) {
    
    this.session();     
 
  }


  ngOnInit() { 
    
    this.showFilters();
    this.loadFilterProfessionLists();
    
  }

  ngMaps() {
     //load Places Autocomplete
     this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
 
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
 
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          console.log(place.formatted_address);
          this.address = place.formatted_address;
          this.affiliateService.selectedAfiliado.address = this.address;

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.affiliateService.selectedAfiliado.positionLat = this.latitude;        
          this.affiliateService.selectedAfiliado.positionLng = this.longitude;
          this.zoom = 14;
        });
      });
    });
    
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.affiliateService.selectedAfiliado.positionLat = this.latitude;        
        this.affiliateService.selectedAfiliado.positionLng = this.longitude;
        this.zoom = 13;       
      });
    }
  }

  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.affiliateService.selectedAfiliado.positionLat = this.latitude;        
    this.affiliateService.selectedAfiliado.positionLng = this.longitude;
    this.getAddress(this.latitude, this.longitude);
  }
 
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 14;
          this.address = results[0].formatted_address;
          this.affiliateService.selectedAfiliado.address = this.address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
 
    });
  }
  
  ngAfterViewInit(){
    
  }

  session(){
    this.auth.session()
      .subscribe((res: any) =>{                
        this.isLogged = res.isLogged;
        if(this.isLogged){          
          this.user = res.user;
          this.auth.token = res.user.token;
          this.userNameCurrent = this.user.user.userName;
          this.sessions = res.session;               
          this.getAfiliados(this.user.user.userName); 
        }else{          
          this.router.navigate(['login']);
        }
      });
  }
  
  getAfiliados(user: string) {  
    this.isLoading = true;   
    this.affiliateService.getAffiliatesByUserPaginated(user, 1)
      .subscribe((data: any ) => {      
        this.affiliates = data.affiliates;                 
        this.isLoading = false;
        this.pager = data.pager;
        this.pageOfItems = data.pageOfItems;
    });
  }

  getAfiliadosPerPage( page: number) {
    this.isLoading = true;
    if( this.globalSearchCriteria.length === 0 )
    {
      this.affiliateService.getAffiliatesByUserPaginated(this.user.user.userName, page)
        .subscribe((data: any ) => {
          this.affiliates = data.affiliates;
          this.isLoading = false;
          this.pager = data.pager;
          this.pageOfItems = data.pageOfItems;
        });
    }
    else if(this.globalSearchCriteria.length > 2){
      this.contactSearcher(this.globalSearchCriteria, page);
    }
    
  }

  addAfiliado(form: NgForm) {
    if (
        this.affiliateService.selectedAfiliado.names == (null || '') ||
        this.affiliateService.selectedAfiliado.surnames == (null || '') ||
        this.affiliateService.selectedAfiliado.identification == (0) || null) {
          this.isEmptyFields = true;          
      if (!this.affiliateService.selectedAfiliado.birthdate  ) {
        this.isEmptyBirthdate = true;
      } else {
        this.isEmptyBirthdate = false;
      }
      if (this.affiliateService.selectedAfiliado.names == (null || '')) {
        this.isEmptyNames = true;
      } else {
        this.isEmptyNames = false;
      }
      if (this.affiliateService.selectedAfiliado.surnames == (null || '')) {
        this.isEmptySurnames = true;
      } else {
        this.isEmptySurnames = false;
      }
      if (this.affiliateService.selectedAfiliado.identification == (null || 0)) {
        this.isEmptyIdentification = true;
      } else {
        this.isEmptyIdentification = false;
      }
    } else {
      this.isDisabledButton = true;
      if (form.value._id) {        
        this.affiliateService.putAfiliado(form.value)
          .subscribe((res: any) => {        
            console.log('Affiliate Updated');
            this.getAfiliados(this.user.user.userName);
            this.isNewAffiliate = false;                                              
          });
               
      } else {  
        console.log(form.value);  
        if(form.value.leader){
                  
        }else if (form.value.leader === ""){          
          form.value.leader = "sin lider";
        }                    
        this.affiliateService.postAfiliado(form.value)
          .subscribe(res => {
            console.log(res);
          console.log('Affiliate Saved');
          this.getAfiliados(this.user.user.userName);
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
    this.isDisabledButton = false;
    this.getDivipolInfo();
    this.getGeographyInfo();
    this.getProfessions(event);
    this.getOcupations(event);
    this.getChurchs(event);
    this.getSexs(event);   
    this.ngMaps();
    this.getElectoralInfo();
  }

  deleteAfiliado(_id: string) {
    if (confirm('Esta seguro de Eliminar este afiliado?')) {
      this.affiliateService.deleteAfiliado(_id)
        .subscribe(res => {
        console.log('Affiliate deleted');
        this.getAfiliados(this.user.user.userName);
      });
    }
  }

  getDivipolInfo() {
    this.divipolMasterService.getDivipolMasters()
      .subscribe((data: any) => {        
        this.divipols = data.Items;
        for (let i = 0; i < this.divipols.length; i++) {
            this.states[i] = this.divipols[i].state;
        }      
    });
  }

  onOptionsSelectedState(value: string) {
    this.affiliateService.selectedAfiliado.municipality = '';
    this.municipalitys = [];

    for (let i = 0; i < this.divipols.length; i++) {
      if (value == this.divipols[i].state) {
        for (let j = 0; j < this.divipols[i].municipality.length; j++) {
          this.municipalitys[j] = this.divipols[i].municipality[j];
        }
      }
    }
  }

  getGeographyInfo() {
    this.geographyMasterService.getGeographyMasterByUser(this.user.user.userName)
      .subscribe((data: any) => {
        this.geographys = data.Items;        
    });
  }

  onOptionsSelectedMunicipality(value: string) {
    this.affiliateService.selectedAfiliado.zone = '';
    this.affiliateService.selectedAfiliado.subdivision = '';
    this.affiliateService.selectedAfiliado.votingStation = '';
    this.affiliateService.selectedAfiliado.votingPlace = '';
    this.affiliateService.selectedAfiliado.votingTable = '';
    this.subdivisions = [];
    this.votingStations = [];
    this.votingTables = [];
    const votingStations1 = [];

    for (let i = 0; i < this.electorals.length; i++) {
      if (value == this.electorals[i].municipality &&
        this.affiliateService.selectedAfiliado.state == this.electorals[i].state) {
          votingStations1[i] = this.electorals[i].votingStation;
      }
    }
    this.votingStations = votingStations1.filter(() => true);
  }

  onOptionsSelectedZone(value: string) {
    this.affiliateService.selectedAfiliado.subdivision = '';
    const subdivisions1 = [];
    for (let i = 0; i < this.geographys.length; i++) {
      if (value == this.geographys[i].zone &&
        this.affiliateService.selectedAfiliado.state == this.geographys[i].state &&
        this.affiliateService.selectedAfiliado.municipality == this.geographys[i].municipality) {
          subdivisions1[i] = this.geographys[i].subdivision;
      }
    }
    this.subdivisions = subdivisions1.filter(() => true);
  }

  getElectoralInfo() {
    this.electoralMasterService.getElectoralMastersByUser(this.user.user.userName)
    .subscribe((data: any ) => {
      this.electorals = data.Items;
    });
  }

  onOptionsSelectedStation(value: string) {
    this.affiliateService.selectedAfiliado.votingTable = '';
    this.votingTables = [];    
    for (let i = 0; i < this.electorals.length; i++) {
      if (value === this.electorals[i].votingStation) {
        this.affiliateService.selectedAfiliado.votingPlace = this.electorals[i].votingPlace;
        this.numberTables = this.electorals[i].numberTables;
      }
    }
    for (let i = 0; i < this.numberTables; i++) {
      this.votingTables[i] = 'Mesa ' + (i + 1) ;
    }
  }

  getProfessions(event) {
    const arr1: any[] = [];
    this.listMaster.getListMasters()
    .subscribe((data: any ) => {
      for (let i = 0; i < data.Items.length; i++) {
        if (data.Items[i].type == 'Profesión') {
          arr1[i] = data.Items[i].name;
        }
      }      
      this.professions = arr1.filter( function() { return true; });      
    });
  }

  getOcupations(event) {
    const arr: any[] = [];
    this.listMaster.getListMasters()
    .subscribe((data: any ) => {
      for (let i = 0; i < data.Items.length; i++) {
        if (data.Items[i].type == 'Ocupación') {
          arr[i] = data.Items[i].name;
        }
      }      
      this.ocupations = arr.filter( () => true);      
    });
  }

  getChurchs(event) {
    const arr: any[] = [];
    this.listMaster.getListMasters()
    .subscribe((data: any ) => {
      for (let i = 0; i < data.Items.length; i++) {
        if (data.Items[i].type == 'Religión') {
          arr[i] = data.Items[i].name;
        }
      }      
      this.churchs = arr.filter( () => true);      
    });
  }

  getSexs(event) {
    const arr: any[] = [];
    this.listMaster.getListMasters()
    .subscribe((data: any ) => {
      for (let i = 0; i < data.Items.length; i++) {
        if (data.Items[i].type == 'Sexo') {
          arr[i] = data.Items[i].name;
        }
      }      
      this.sexs = arr.filter( () => true);      
    });
  }

  // clean the form
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.affiliateService.selectedAfiliado = new Afiliado();
      this.userNameCurrent = this.user.user.userName;      
    }
  }

  loadMasterLists(form: NgForm) {
    this.isNewAffiliate = true;
    this.resetForm(form);
    this.affiliateService.selectedAfiliado._id = null;
    this.getProfessions(event);
    this.getOcupations(event);
    this.getChurchs(event);
    this.getSexs(event);
    this.getElectoralInfo();
    this.getGeographyInfo();
    this.getDivipolInfo();
    this.isDisabledButton = false;
    this.ngMaps();
  }

  cancelar(form: NgForm) {
    this.isNewAffiliate = false;
    this.resetForm(form);
    //this.getAfiliados(this.user);
  }

  ngOnDestroy() {
    this.affiliateService.selectedAfiliado = new Afiliado();
  }

  openModalCargaMasiva(){
    this.bsModalRef = this.modalServiceDos.show(ModalCargaMasivaComponent, Object.assign({}, { class: 'gray modal-lg' }));
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.datosGuardadosEvent.subscribe(($event)=>{
        this.eventEmmiter($event);
    });
  }

  openModalDetalleContacto(afiliado: Afiliado){
    const initialState = { 
      names: afiliado.names, 
      surnames: afiliado.surnames,
      identification: afiliado.identification,
      phone: afiliado.phone,
      birthdate: afiliado.birthdate,
      votingStation: afiliado.votingStation,
      votingTable: afiliado.votingTable,
      leader: afiliado.leader,
      subdivision: afiliado.subdivision
    };
    this.bsModalRefTres = this.modalServiceTres.show(ModalDetalleContactoComponent, Object.assign({}, { class: 'gray modal-lg', initialState }));    
    //this.bsModalRef.content.closeBtnName = 'Close';           
  }

  eventEmmiter(event){
      this.getAfiliadosPerPage(1);
  }

  contactSearcher(searchCriteria:string, page:number){
    this.globalSearchCriteria = searchCriteria;
    if(typeof searchCriteria !== "undefined"){
      if( searchCriteria.length > 2 )
      {
        this.isLoading = true;
        this.affiliateService.searchContactsByUser(this.user.user.userName, searchCriteria, page ).subscribe((data: any ) => {
          this.isLoading = false;
          this.affiliates = data.totalRows;
          this.pager = data.pager;
          this.pageOfItems = data.pageOfItems;
          //console.log(JSON.stringify(this.contactResultList, null, 4));
        });
      }
      else if( searchCriteria.length === 0 ){
        this.getAfiliadosPerPage(1);
      }      
    }    
  }

  showFilters(){
    this.isFilter = !this.isFilter;
    let zonaFiltrada: any[] = [];
    let zonaFiltrada1 = _.uniqBy(this.pageOfItems, 'zone');
    console.log(zonaFiltrada1);
    for(let i=0; i<zonaFiltrada1.length; i++){
      zonaFiltrada[i] = zonaFiltrada1[i].zone;
    }
  console.log(zonaFiltrada);
    
  }


  contactSearchByZone(zone:string){ 
    console.log(zone);
    this.isLoading = true;  
    if(zone === 'Ninguno'){
      this.getAfiliadosPerPage(1);
    }else{
      this.affiliateService.searchContactsByZone(this.user.user.userName, zone ).subscribe((data: any ) => {
        this.isLoading = false;
        this.affiliates = data.totalRows;
        //this.pager = data.pager;
        this.pageOfItems = data.pageOfItems;
        console.log(this.pageOfItems)
        const subdivisionByZoneFilter1 = []
        for(let i=0; i<this.pageOfItems.length; i++){
          if(this.pageOfItems[i].zone === zone){
             subdivisionByZoneFilter1[i] = this.pageOfItems[i].subdivision
          }
        }
        console.log(subdivisionByZoneFilter1);
        //this.subdivisionByZoneFilter = _.uniqBy(subdivisionByZoneFilter1);
        console.log(this.subdivisionByZoneFilter);
      });  
    }               
  }

  contactSearchBySubdivision(subdivision:string){ 
    console.log(subdivision); 

    this.subdivisionParameter = subdivision;
    this.isLoading = true;  
    
    if(subdivision === 'Ninguno'){
      this.getAfiliadosPerPage(1);      
    }else{
      this.affiliateService.searchContactsBySubdivision(this.user.user.userName, subdivision ).subscribe((data: any ) => {
        this.isLoading = false;
        this.affiliates = data.totalRows;
        //this.pager = data.pager;
        this.pageOfItems = data.pageOfItems;
        this.temp = data.pageOfItems;
        console.log(this.pageOfItems)
        const professionByZoneFilter1 = []
      for(let i=0; i<this.pageOfItems.length; i++){
        if(this.pageOfItems[i].subdivision === subdivision){
          professionByZoneFilter1[i] = this.pageOfItems[i].profession
        }
      }
      //this.professionByZoneFilter = _.uniqBy(professionByZoneFilter1);
      console.log(this.professionByZoneFilter);
      });  
    }                    
  }

  contactSearchByProfession(profession:string){ 
    console.log(profession);
    this.isLoading = true;  

    if(this.pageOfItems){
      console.log(this.pageOfItems);
      for(let i=0; i<this.pageOfItems.length; i++){
        if(this.pageOfItems[i].profession !== profession){
          this.pageOfItems.splice(i,1);
          i--;
        }
      }
      this.isLoading = false;
      this.affiliates = this.pageOfItems.length;
      console.log(this.temp.length + " array temp");
      
    }else{
      if(profession === 'Ninguno'){
        this.getAfiliadosPerPage(1);
      }else{
        this.affiliateService.searchContactsByProfession(this.user.user.userName, profession ).subscribe((data: any ) => {
          this.isLoading = false;
          this.affiliates = data.totalRows;
          //this.pager = data.pager;
          this.pageOfItems = data.pageOfItems;
          //console.log(this.pageOfItems)
        });  
      }    
    }
    
               
  }

  contactSearchByChurch(church:string){ 
    console.log(church);
    
    this.isLoading = true;  
    

    if(church === 'Ninguno'){
      this.getAfiliadosPerPage(1);
    }else{
      this.affiliateService.searchContactsByChurch(this.user.user.userName, church ).subscribe((data: any ) => {
        this.isLoading = false;
        this.affiliates = data.totalRows;
        //this.pager = data.pager;
        this.pageOfItems = data.pageOfItems;
        console.log(this.pageOfItems)
      });  
    }               
  }

  loadFilterProfessionLists(){
    this.listMaster.getListByType("Profesion").subscribe((data: any) => {
      this.professionsList = data.Items;
      this.loadFilterOcupacionLists();     
    });
  }

  loadFilterOcupacionLists(){
    this.listMaster.getListByType("Ocupacion").subscribe((data: any) => {
      this.ocupationList = data;
      console.log("OCUPACIONES: " + JSON.stringify(this.ocupationList, null, 4));
      this.loadFilterReligionLists();
    });
  }

  loadFilterReligionLists(){
    this.listMaster.getListByType("Religion").subscribe((data: any) => {
      this.religionList = data.Items;
      this.loadFilterGenderLists();
    });
  }

  loadFilterGenderLists(){
    this.listMaster.getListByType("Sexo").subscribe((data: any) => {
      this.genderList = data;      
      console.log("GENEROS: " + JSON.stringify(this.genderList, null, 4));
    });
  }


}
