import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisesService } from 'src/app/services/paises.service';
import { DataPaises, Pais } from '../../interfaces/paises-response';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboardForm: FormGroup;
  minDate: Date;
  maxDate: Date;
  paises: DataPaises;
  paisesData: Pais[] = [];
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;


  constructor(private formBuilder: FormBuilder,
              private _paisesService: PaisesService) {

    this.crearFormulario();
    this._paisesService.getPaises().subscribe( responsePaises => {
      this.paisesData = Object.keys(responsePaises).map( key => {
        return {
          "country": responsePaises[key]["country"], 
          "region": responsePaises[key]["region"]
        };
      });      
    });
  }

  ngOnInit(): void {

    this.minDate = new Date();
    this.minDate.setMonth( this.minDate.getMonth() - 11 );

    this.maxDate = new Date();
    var numberOfDaysToAdd = 1;
    this.maxDate.setDate(this.maxDate.getDate() + numberOfDaysToAdd);    
  }

  crearFormulario(){
    this.dashboardForm = this.formBuilder.group({
      nombre: [null, [Validators.required]],
      correo: [null, [Validators.required, Validators.pattern( this.emailRegx )]],
      fechaReserva: [null, [Validators.required]],
      pais: [ null ]
    });
  }

  get nombreNoValido(){
    return this.dashboardForm.get('nombre').invalid && this.dashboardForm.get('nombre').touched;
  }

  get correoNoValido(){
    return this.dashboardForm.get('correo').invalid && this.dashboardForm.get('correo').touched;
  }

  get fechaReservaNoValido(){
    return this.dashboardForm.get('fechaReserva').invalid && this.dashboardForm.get('fechaReserva').touched;
  }



  enviar(){
    console.log(this.dashboardForm);
    if (!this.dashboardForm.valid) {
      return;
    }
  }

}
