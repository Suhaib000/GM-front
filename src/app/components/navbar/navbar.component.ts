import { Component } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private router: Router, private cookiesService: CookieService) { }

  logOut(){
    this.cookiesService.deleteAll()
    // this.router.navigate(['/login']).then();
  }

  getFullName(){
    return this.cookiesService.get("username")
  }


}
