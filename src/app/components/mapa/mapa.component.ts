import { Component, OnInit, ViewChild } from '@angular/core';
import { AffiliatesService } from '../../services/affiliates.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
 
 

  icon = 'http://www.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png';  
  lat = 7.119349000000001;
  lng = -73.12274159999998;
  zoom = 13; 
  
  marcadores: any[];
  

  constructor( private affiliateService: AffiliatesService, public auth: AuthService,
               private router: Router) { }

  ngOnInit() {
    if(!this.auth.isLogged){
      this.router.navigate(['/login']);
    }
    this.getAfiliados();
  }

  getAfiliados() {
    this.affiliateService.getAffiliatesByUser(this.auth.user)
    .subscribe((data: any ) => {
      this.marcadores = data.Affiliates;
      console.log(this.marcadores);
    });
  }

}
