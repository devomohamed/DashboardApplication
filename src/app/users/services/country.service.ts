import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from 'src/app/core/models/country.model';
import { RsponseData } from 'src/app/core/models/response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  apiUrl:string = environment.api;

  constructor(private http: HttpClient) { }

  getAllCountries():Observable<RsponseData<Country[]>>{
    return this.http.get<RsponseData<Country[]>>(`${this.apiUrl}/countries?return_all=1`)
  }
}
