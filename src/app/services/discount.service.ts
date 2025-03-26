import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Discount{
  ID:number;
  Name:string;
  DiscountAmount: number;
  ExpairedTime:Date;
}


@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private apiUrl = 'https://localhost:7056/api/Discount';
  constructor(private http:HttpClient) { }


getDiscount():Observable<Discount[]>{
 return this.http.get<Discount[]>(`${this.apiUrl}/GetAllDiscount`); 
}

addDiscount(discount:Discount):Observable<Discount>{
  return this.http.post<Discount>(`${this.apiUrl}/AddDiscount`, discount); 
}

}
