import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeminarService {
  [x: string]: any;
  private baseUrl = 'http://localhost:3000/api/seminars'; // Change this URL to wherever your Node.js server is hosted

  constructor(private http: HttpClient) { }

  getSeminars(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
  
  addSeminar(seminarData: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/seminars', seminarData, { responseType: 'text' });
  }
  deleteSeminar(id: number): Observable<string> { // Expect a string response
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
  updateSeminar(id: number, seminarData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, seminarData, { responseType: 'text' });
  }
  
}
