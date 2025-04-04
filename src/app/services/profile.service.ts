import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'https://localhost:7056/api';

  constructor(private http: HttpClient,private authService:AuthenticationService) {}
  // getUserProfile(): Observable<any> {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     console.error('Token bulunamadı');
  //     return throwError(() => new Error('Token bulunamadı'));
  //   }
  
  //   const decodedToken: any = jwtDecode(token);
  //   const customerId = decodedToken?.['CustomerId']; 
  
  //   if (!customerId) {
  //     console.error('Customer ID token içinde bulunamadı');
  //     return throwError(() => new Error('Customer ID bulunamadı'));
  //   }
  
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
  //   return this.http.get<any>(`${this.apiUrl}/Customer/GetCustomerById?id=${customerId}`, { headers });
  // }
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
  
  
  updateUserProfile(customer: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Customer`, customer);
  }

  getCoupons(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Discount/GetAllDiscount`);
  }

 
  getOrders(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Customer/GetUserOrders/${userId}`);

  }


}
