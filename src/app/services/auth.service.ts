import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject!: BehaviorSubject<any>;
  public currentUser!: Observable<any>;
  private loginUrl = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient) {
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = currentUserString !== null ? JSON.parse(currentUserString) : null;

  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  
  login(username: string, password: string): Observable<any> {
    return this.http.post(this.loginUrl, { username, password });
  }
 
  logout(): void {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
