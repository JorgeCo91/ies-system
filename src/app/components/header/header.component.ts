import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Route, Router } from '@angular/router';
import { DoCheck } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {

  isAuth: boolean = false;
  
  constructor(private _auth: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.isAuth = this._auth.estaAutenticado();
  }

  salir(){
    this._auth.logOut();
    this.isAuth = false;
    this.router.navigateByUrl('/login');
  }

}
