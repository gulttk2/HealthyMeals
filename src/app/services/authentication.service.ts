import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

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
        debugger
        if (response.token) {
          localStorage.setItem('token', response.token);  
          const role = this.getUserRole();
          if (role === 'Admin') {
            debugger

            return { role, token: response.token };
          } else {
            return { role, token: response.token };
          }
        }
        return response;
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError('Giriş işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      })
    );
  }
  
  register(registerData: { Name: string, Surname: string, PhoneNumber: string, Address: string, Email: string, Password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, registerData).pipe(
      catchError(error => {
        console.error('Register error:', error);
        return throwError('Kayıt işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }


  getUserRole(): string | null {
    debugger
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        console.log(decodedToken); 

        return decodedToken?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
      } catch (e) {
        console.error('Token çözülürken hata oluştu:', e);
        return null;
      }
    }
    return null;
  }

}
