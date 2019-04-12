import { Component, OnInit, ViewChild } from '@angular/core';
import { AffiliatesService } from '../../services/affiliates.service';
import { AuthService } from '../../services/auth.service';

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
  

  constructor( private affiliateService: AffiliatesService, public auth: AuthService) { }

  ngOnInit() {
    this.getAfiliados();
    
  }

  getAfiliados() {
    this.affiliateService.getAffiliatesByPresident(this.auth.user)
    .subscribe((data: any ) => {
      this.marcadores = data.Affiliates;
      console.log(this.marcadores);
    });
  }

}
