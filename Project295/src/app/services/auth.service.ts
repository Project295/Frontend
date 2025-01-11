import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7011/api/Login';

  constructor(private http: HttpClient) { }

  register(registerData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Register`, registerData);
  }

  login(loginData: any): Observable<any> {
    const params = new HttpParams()
        .set('UserName', loginData.Email)
        .set('Password', loginData.Password);

    return this.http.get(`${this.apiUrl}/Login`, { params });
}

}

