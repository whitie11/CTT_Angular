import { Injectable } from '@angular/core';
import { HttpClient , HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Patient } from '@app/models/patient';
import { Clinic } from '@app/models/clinic';
import { Locality } from '@app/models/locality';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private api: string = environment.api_server + '/lists/';

  constructor(private http: HttpClient) { }

  public  getClinics(): Observable<Clinic[]> {
    const url = this.api + 'getClinics' ;
    const result = this.http.get<Clinic[]>(url);
    return  result;
  }

  public  getLocalities(): Observable<Locality[]> {
    const url = this.api + 'getLocalities' ;
    const result = this.http.get<Locality[]>(url);
    return  result;
  }

}
