import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private apiUrl = 'https://localhost:7056/api/Authentication';

  constructor(private http: HttpClient) {}

  // Login işlemi
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      map(response => {
        if (response.token) {
          // Token'i sessionStorage'da saklayın
          sessionStorage.setItem('token', response.token);  // Daha güvenli
        }
        return response;
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError('Giriş işlemi sırasında bir hata oluştu.');
      })
    );
  }

  // Register işlemi
  register(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, {email, password }).pipe(
      catchError(error => {
        console.error('Registration error:', error);
        return throwError('Kayıt işlemi sırasında bir hata oluştu.');
      })
    );
  }

  // Kullanıcıyı çıkış yap
  logout(): void {
    sessionStorage.removeItem('token');  // Token'i sessionStorage'dan sil
  }

  // Token al
  getToken(): string | null {
    return sessionStorage.getItem('token');  // sessionStorage'dan token al
  }

  // Kullanıcı oturum açmış mı?
  isAuthenticated(): boolean {
    return !!this.getToken();  // Token var mı diye kontrol eder
  }
}
