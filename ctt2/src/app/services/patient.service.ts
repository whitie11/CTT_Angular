import { Injectable } from '@angular/core';
import { HttpClient , HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Patient } from '@app/models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private api: string = environment.api_server + '/patients/';

  constructor(private http: HttpClient) { }

  public  getAllPts(): Observable<Patient[]> {
    const url = this.api + 'getAll' ;
    const result = this.http.get<Patient[]>(url);
    return  result;
  }



}
