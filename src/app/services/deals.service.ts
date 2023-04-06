import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'; 
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DealsService {
  apiURLADSs = environment.apiUrl;
  constructor(
    private http:HttpClient) { }

    deals(){
      return this.http.get(this.apiURLADSs)
    }
    updateDeals(data:any,value:string){
      const update = {
        "status":value
      }
      return this.http.put(`${this.apiURLADSs}/${data.id}`,update)
    }
} 
