import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facility } from './facility.model';
@Injectable({
  providedIn: 'root'
})
export class FormServiceService {

  constructor(public http:HttpClient) { }

  private apiUrl = 'https://my-json-server.typicode.com/iranjith4/ad-assignment/db';


  getFacilitiesAndExclusions(): Observable<{ facilities: Facility[], exclusions: any[] }> {
    return this.http.get<{ facilities: Facility[], exclusions: any[] }>(this.apiUrl);
  }

  async getData() {
   let resp=this.http.get(this.apiUrl).toPromise().then((res)=>{
    return res;
   })
   return resp
  }

}
