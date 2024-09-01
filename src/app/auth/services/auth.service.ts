import { Injectable } from '@angular/core';
import { IloginCredentional } from 'src/app/core/models/loginCredentional.model';
import { IUser } from 'src/app/core/models/user.model';
import { RsponseData } from 'src/app/core/models/response.model';

import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { HttpHelperService } from 'src/app/core/services/http-helper.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private httpHelper:HttpHelperService) { }

  login(loginInfo:IloginCredentional){
    let credential = this.httpHelper.formDataConverter(loginInfo)
    return this.http.post<RsponseData>(`${environment.api}/auth/admin-login`,credential)
  }
}
