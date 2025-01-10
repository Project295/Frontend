import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7011/api/Login';

  constructor(private http: HttpClient) { }

  register(registerData: any) {
     this.http.post(`${this.apiUrl}/Register`, registerData).subscribe();
  }
}

