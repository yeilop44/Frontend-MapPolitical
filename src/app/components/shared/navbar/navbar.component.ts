
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoading = false;
  user: any;
  isLogged = false;
  isLogout: boolean;

  constructor(public auth: AuthService, private _router: Router) { 
    this.session();
  }

  ngOnInit() {
    
  }

  session(){
    this.auth.session()
      .subscribe(( res: any )=>{      
        this.isLogged = res.isLogged;
       
        if(this.isLogged){
          this.auth.isLogged = this.isLogged;
          this.user = res.user.user;
          this.auth.user = this.user;          
        }          
      });
  }    

  logout() {
    this.auth.logout()
      .subscribe((res: any) =>{      
        this.isLogout = res.isLogout;
        if(this.isLogout){
          this.auth.isLogged = false;         
          this._router.navigate(['/login']);      
        }
      });
  }

  account() {
    this._router.navigate(['/cuenta']);
  }
  settingsUser() {
    this._router.navigate(['/usuario']);
  }

  searchContacts( searchCriteria: string){
    //console.log(searchCriteria);
    if( typeof searchCriteria !== "undefined" && searchCriteria.length > 2 ){
      this._router.navigate(['/searchengine/', searchCriteria]);
    }    
  }

}
