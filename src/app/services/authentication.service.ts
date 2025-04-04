import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'https://localhost:7056/api/Authentication';

  constructor(private http: HttpClient) {}

  login(Email: string, Password: string): Observable<any> {
    const loginData = { Email, Password };
  
    if (!loginData.Email || !loginData.Password) {
      return throwError('Email ve şifre gereklidir.');
    }
  
    return this.http.post<any>(`${this.apiUrl}/login`, loginData).pipe(
      map(response => {
        if (response.token) {
          localStorage.setItem('token', response.token); // Token'ı kaydet
          localStorage.setItem('role', response.role); // Kullanıcı rolünü kaydet
  
          // Kullanıcı rolüne göre yönlendirme
          const role = response.role;
          if (role === 'Admin') {
            // Admin için özel işlem (örneğin, Admin sayfasına yönlendirme)
            return { role, token: response.token };
          } else {
            // Diğer kullanıcılar için ana sayfaya yönlendirme
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


  getUserRole(): string | null {
    debugger
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        console.log(decodedToken); // decodedToken'ı konsola yazdır

        // 'role' bilgisi burada farklı bir adla yer alıyor
        return decodedToken?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || null;
      } catch (e) {
        console.error('Token çözülürken hata oluştu:', e);
        return null;
      }
    }
    return null;
  }



getUserId(): string | null {
  debugger
  const token = this.getToken();
  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      console.log('Decoded Token:', decodedToken); // Kontrol için
      return decodedToken?.['CustomerId'] || null;
    } catch (e) {
      console.error('Token çözümlenirken hata oluştu:', e);
      return null;
    }
  }
  return null;
}

getUserProfile(): Observable<any> {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('Token bulunamadı');
    return throwError(() => new Error('Token bulunamadı'));
  }

  // Token'ı çözümleyerek CustomerId'yi al
  const decodedToken: any = jwtDecode(token);
  const customerId = decodedToken.CustomerId;  // Token'dan CustomerId'yi al

  if (!customerId) {
    console.error('Customer ID token içinde bulunamadı');
    return throwError(() => new Error('Customer ID token içinde bulunamadı'));
  }

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,  // Authorization header'ı ekliyoruz
  });

  return this.http.get<any>(`${this.apiUrl}/Customer/GetCustomerById?id=${customerId}`, { headers });
}








}
