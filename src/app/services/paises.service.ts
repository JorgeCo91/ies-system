import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaisesResponse } from '../interfaces/paises-response';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private urlEndPoint: string = 'https://api.first.org/data/v1/countries?region=africa&limit=10&pretty=true';

  constructor(private http: HttpClient) { }

  getPaises(){

    return this.http.get<PaisesResponse>(this.urlEndPoint).pipe(
      map( 
        response => {
          if ( response.status === 'OK') {
            return response.data
          }
        }
         
      )
    );

  }
}
