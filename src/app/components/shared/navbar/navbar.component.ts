
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

  constructor(private auth: AuthService, public router: Router) { 
    this.session();
  }

  ngOnInit() {
    
  }

  session(){
    this.auth.session()
      .subscribe(( res: any )=>{
        console.log(res);
        this.isLogged = res.isLogged;
        this.user = res.user;
        if(this.isLogged){
          this.auth.isLogged = this.isLogged;
          this.auth.user = this.user;          
        }          
      });
  }    

  logout() {
    this.auth.logout()
      .subscribe((res: any) =>{
        console.log(res);
        this.isLogout = res.isLogout;
        if(this.isLogout){
          this.auth.isLogged = false;
          console.log(this.auth.isLogged);
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
