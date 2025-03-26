import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Order {
  ID: number;
  CustomerID: number;
  Customer: any;  
  ProductID: number;
  Product: any;  
  DateTime: string;
}
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'https://localhost:7056/api/Order';

  constructor(private http: HttpClient) { }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/AddOrder`, order);
  }

}
