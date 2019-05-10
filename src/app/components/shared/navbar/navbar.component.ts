
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

  constructor(private auth: AuthService, public router: Router) { }

  ngOnInit() {

  }

  logout() {
    this.isLoading = true;
    this.auth.logout();
    this.isLoading = false;
    this.router.navigate(['/login']);
  }

  account() {
    this.router.navigate(['/cuenta']);
  }
  settingsUser() {
    this.router.navigate(['/usuario']);
  }

}
