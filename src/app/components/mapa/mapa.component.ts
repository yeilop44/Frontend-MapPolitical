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
  zoom = 12; 
  
  marcadores: any[];
  User: any[]=[];
  

  constructor( private affiliateService: AffiliatesService, public auth: AuthService,
               private router: Router) { 
    if(!this.auth.isLogged){
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    
    this.getAfiliados();
    this.getUser();
  }

  getAfiliados() {
    this.affiliateService.getAffiliatesByUser(this.auth.user, 52)
    .subscribe((data: any ) => {
      this.marcadores = data.Affiliates;
      console.log(this.marcadores);
    });
  }

  getUser() {
    this.auth.getUserSettings(this.auth.user)
      .subscribe((data: any) => {
        this.User = data.User[0];
      });
  }

}
