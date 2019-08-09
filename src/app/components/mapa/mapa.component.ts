import { Component, OnInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { AffiliatesService } from '../../services/affiliates.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AgmMap } from '@agm/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit, AfterViewInit {
  //@ViewChild('mapAgmMap') private map: AgmMap; 
  lat: number;
  lng: number;
  

  icon = 'http://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png';  
  zoom = 12; 
  
  marcadores: any[];
  user: any;
  isLogged: boolean;
  
  constructor( private affiliateService: AffiliatesService, public auth: AuthService, private router: Router) { 
    
  }

  ngOnInit() {
    this.session();
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
          this.lat = res.user.user.positionLat;
          this.lng = res.user.user.positionLng;
          this.getAfiliados(this.user.user.userName);                                                                                                     
        }else{          
          this.router.navigate(['login']);
        }  
      });        
  }

  getAfiliados(username: string) {
    this.affiliateService.getAffiliatesByUser(username)
    .subscribe((data: any ) => {
      this.marcadores = data.affiliates;      
    });
  } 

}
