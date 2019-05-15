import { Component, ViewChild, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AffiliatesService } from '../../services/affiliates.service';
import { ProfessionsService } from '../../services/professions.service';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { Afiliado } from '../../models/afiliado';
import { Router } from '@angular/router';
import {} from 'googlemaps';



@Component({
  selector: 'app-afiliados',
  templateUrl: './afiliados.component.html',
  styleUrls: ['./afiliados.component.css']
})
export class AfiliadosComponent implements OnInit, AfterViewInit, OnDestroy   {
  
  @ViewChild('map') mapElement: any;
  @ViewChild('search') public searchElement: any;

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
  
  affiliates: any[] = [];
  professions: any[] = [];
  userNameCurrent;


  constructor(private affiliateService: AffiliatesService, public auth: AuthService, private professionService: ProfessionsService, 
              private router: Router) { 
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
  
    }, 100);
 
  }

  ngAfterViewInit(){
    console.log("afterinit");
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
    if (form.value._id) {
      this.affiliateService.putAfiliado(form.value)
        .subscribe(res => {          
          console.log(res);
          console.log('Affiliate Updated');
          this.getAfiliados();
          this.isNewAffiliate = false;
        });
      this.resetForm(form);
        
    } else {
       this.affiliateService.postAfiliado(form.value)
        .subscribe(res => {
        console.log('Affiliate Saved');
        this.getAfiliados();
        this.isNewAffiliate = false;
      });
      this.resetForm(form);
    }
  }

  editAfiliado(afiliado: Afiliado) {
    this.affiliateService.selectedAfiliado = afiliado;
    this.isNewAffiliate = true;
    this.ngMaps();
    this.getProfessions(event);
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
  
  getProfessions(event) { 
    this.professionService.getProfessions()
    .subscribe((data: any ) => {
      this.professions = data.Items;
      console.log(data.Items);
    });
     
  }

  //clean the form
  resetForm(form?: NgForm){
  	if(form){
  		form.reset();
  		this.affiliateService.selectedAfiliado = new Afiliado();
  	}
  }

  NewAffiliate(form: NgForm) {
    this.isNewAffiliate = true;
    this.resetForm(form);
    this.affiliateService.selectedAfiliado._id = null;
    this.ngMaps();
    this.getProfessions(event);
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
