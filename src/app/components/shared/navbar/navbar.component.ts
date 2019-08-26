
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

  constructor(public auth: AuthService, public router: Router) { 
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
          this.router.navigate(['/login']);      
        }
      });
  }

  account() {
    this.router.navigate(['/cuenta']);
  }
  settingsUser() {
    this.router.navigate(['/usuario']);
  }

}
