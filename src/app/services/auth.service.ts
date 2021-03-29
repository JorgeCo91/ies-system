import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators'
import { UsuarioModel } from '../models/usuario.model';
import { LoginResponse, RolesUsuario } from '../interfaces/login-response';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlEndPoint: string = 'https://ies-webcontent.com.mx/xccm/user/validarUsuario';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  
  rolUser: string = '';

  constructor(private http: HttpClient) {
    this.leerRol();
  }

  login( authData: UsuarioModel ) {
    return this.http.post<LoginResponse>(this.urlEndPoint, authData).pipe(
      map(
        response => {
          if ( response.resultado !== null ) {
            this.guardarRol( response.resultado.desc_rol ); 
          }
          return response.resultado
        }
      )
    );
  }

  logOut(){
    localStorage.removeItem('userRol');
    this.rolUser = '';
  }

  leerRol(){
    if ( localStorage.getItem('userRol') ) {
      this.rolUser = localStorage.getItem('userRol');
    } else {
      this.rolUser = '';
    }

    return this.rolUser;
  }

  private guardarRol( rol: string ){
    this.rolUser = rol;
    localStorage.setItem('userRol', rol);
  }

  estaAutenticado(){    
    if ( this.rolUser !== '' && this.rolUser === RolesUsuario['distribuidor']) {
      return true;
    } else {
      return false;
    }
  }
}
