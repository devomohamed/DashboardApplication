import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RsponseData } from 'src/app/core/models/response.model';
import { IUser } from 'src/app/core/models/user.model';
import { HttpHelperService } from 'src/app/core/services/http-helper.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl:string = environment.api;

  constructor(private http: HttpClient,private httpHelper:HttpHelperService) { }

  getUsers(): Observable<RsponseData<IUser[]>> {
    return this.http.get<RsponseData<IUser[]>>(`${this.apiUrl}/users?return_all=1`);
  }
  filterUsers(queryParam:string): Observable<RsponseData<IUser[]>> {
    return this.http.get<RsponseData<IUser[]>>(`${this.apiUrl}/users?${queryParam}`);
  }

  getUser(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${id}`);
  }

  createUser(user: any): Observable<any> {
    let credential = this.httpHelper.formDataConverter(user)
    return this.http.post<any>(`${this.apiUrl}/users/create`, credential);
  }

  updateUser(user: any): Observable<any> {
    let credential = this.httpHelper.formDataConverter(user)
    return this.http.post<any>(`${this.apiUrl}/users/${user.id}/edit`, credential);
  }


  toggleActivation(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/${id}/activation`, {});
  }
}
