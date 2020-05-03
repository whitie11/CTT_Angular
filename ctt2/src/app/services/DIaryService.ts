import { Injectable } from '@angular/core';
import { HttpClient , HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Patient } from '@app/models/patient';
import { Clinic } from '@app/models/clinic';
import { DiaryRow, DiaryReqDTO } from '@app/models/diaryListItem';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  private api: string = environment.api_server + '/diary/';

  constructor(private http: HttpClient) { }

  public  getDiaryPage(data: DiaryReqDTO) {
    const url = this.api + 'getDiaryPage' ;
    const result = this.http.post<DiaryRow[]>(url, data);
    return  result;
  }
}
