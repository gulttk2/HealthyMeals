import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'https://localhost:7056/api/Authentication';

  constructor(private http: HttpClient) {}

  // Login işlemi
  login(Email: string, Password: string): Observable<any> {
    const loginData = { Email, Password };
  
    if (!loginData.Email || !loginData.Password) {
      return throwError('Email ve şifre gereklidir.');
    }
  
    return this.http.post<any>(`${this.apiUrl}/login`, loginData).pipe(
      map(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        return response;
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError('Giriş işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      })
    );
  }
  
  // Register işlemi
  register(registerData: { Name: string, Surname: string, PhoneNumber: string, Address: string, Email: string, Password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, registerData).pipe(
      catchError(error => {
        console.error('Register error:', error);
        return throwError('Kayıt işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      })
    );
  }

  // Kullanıcıyı çıkış yap
  logout(): void {
    localStorage.removeItem('token');
  }

  // Token al
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Kullanıcı oturum açmış mı?
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
