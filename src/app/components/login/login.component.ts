import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UsuarioModel } from '../../models/usuario.model';
import { LoginResponse, Resultado, RolesUsuario } from '../../interfaces/login-response';
import { MatDialog } from '@angular/material/dialog';
import { DialogAlertComponent } from './dialog-alert/dialog-alert.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginResponse: Resultado;  

  constructor(private formBuilder: FormBuilder,
              private _authService: AuthService,
              public dialog: MatDialog,
              private roter: Router  ) { }

  ngOnInit(): void {
    this.crearFormulario();
    
  }

  crearFormulario(){
    this.loginForm = this.formBuilder.group({
      usuario: [null, [Validators.required ]],
      contrasena: [null, Validators.required]
    });
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }
    
    let usuarioData =  new UsuarioModel();
    usuarioData.usuario = this.loginForm.get('usuario').value;
    usuarioData.contrasena = this.loginForm.get('contrasena').value;

    this._authService.login( usuarioData ).subscribe(
      response => {
        this.loginResponse = response;

       if ( this.loginResponse !== null ) {
          if ( this.loginResponse.desc_rol === RolesUsuario['distribuidor']) {
            this.roter.navigateByUrl('/dashbaord');  
          }
        } else {
          this.dialog.open( DialogAlertComponent );
        }
      }
    );
  }

}
