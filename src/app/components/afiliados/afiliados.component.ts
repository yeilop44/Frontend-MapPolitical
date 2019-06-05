import {Component, ViewChild, OnInit, AfterViewInit, ElementRef} from '@angular/core';
import { AffiliatesService } from '../../services/affiliates.service';
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
export class AfiliadosComponent implements OnInit, AfterViewInit {
  
  @ViewChild('map') mapElement: any;
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
  
  affiliates: any[] = [];
  userNameCurrent;

 

  constructor(private affiliateService: AffiliatesService, public auth: AuthService,
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
          //this.resetForm(form);
          console.log('Affiliate Updated');
          this.infoContactoModal.hide();
          this.getAfiliados();
          this.isNewAffiliate = false;

        });

    } else {
       this.affiliateService.postAfiliado(form.value)
        .subscribe(res => {
        //this.resetForm(form);
        console.log('Affiliate Saved');
        this.infoContactoModal.hide();
        this.getAfiliados();
        this.isNewAffiliate = false;
      });
    }
  }

  editAfiliado(afiliado: Afiliado) {
    this.affiliateService.selectedAfiliado = afiliado;
    this.isNewAffiliate = true;
    this.ngMaps();
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

  //clean the form
  resetForm(form?: NgForm){
  	if(form){
  		form.reset();
  		this.affiliateService.selectedAfiliado = new Afiliado();
  	}
  }

  NewAffiliate(form: NgForm) {
    //this.isNewAffiliate = true;
    //this.resetForm(form);
    //this.affiliateService.selectedAfiliado._id = null;
    this.ngMaps();
  }

  cancelar(form: NgForm) {
    this.isNewAffiliate = false;
    this.resetForm(form);
    this.getAfiliados();  
   
  }

  ngDestroy(form: NgForm){
    this.resetForm(form);
  }
}
