import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-componente-uno',
  templateUrl: './componente-uno.component.html'
})
export class ComponenteUnoComponent implements OnInit {

  constructor() { }



  ngOnInit(): void {

    const arrayUno = [
      { value: 1, name: 'CampoUno' },
      { value: 2, name: 'CampoDos' },
      { value: 3, name: 'CampoTres' },
      { value: 4, name: 'CampoCuatro' },
      { value: 5, name: 'CampoCinco' },
      { value: 6, name: 'CampoSeis' },
    ];

    const arrayDos = [
      { value: 21, name: 'a' },
      { value: 20, name: 'b' },
      { value: 19, name: 'c' },
      { value: 18, name: 'd' },
      { value: 17, name: 'e' },
      { value: 16, name: 'f' }
    ];

    const expectObject = {
      CampoUno: 1,
      CampoDos: 2,
      CampoTres: 3,
      CampoCuatro: 4,
      CampoCinco: 5,
      CampoSeis: 6
    } 

    this.convertData( arrayUno );
  }

  convertData( arrayParameter ){

    // Convert array to object
    let dataObject = arrayParameter.reduce( (previousValue, currentValue) => {
      previousValue[currentValue.name] = currentValue.value;
      return previousValue;
    }, {}); // reduce
  
  
    // Convert object to array
    let dataArray = Object.keys(dataObject).map( key => {
      return {
        "value": dataObject[key], 
        "name": key
      };
    });
    
    console.log("Array de entrada: ");
    console.log( arrayParameter );

    console.log("Array a Object: ");
    console.log( dataObject );

    console.log("Object a Array: ");
    console.log( dataArray );

    console.log("*******************************");
  }

}
