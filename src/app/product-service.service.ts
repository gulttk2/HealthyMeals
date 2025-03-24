import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Ürün arayüzü
export interface Product {
  id: number;
  name: string;
  price: string;
  quantity: number;
  shortDescription: string;
  imageUrl: string;  // imageUrl ismiyle uyumlu olacak
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7056/api/Product'; // API URL

  constructor(private http: HttpClient) {}

  // Ürünleri alıyoruz
  getProducts(): Observable<Product[]> {
    
    return this.http.get<Product[]>(`${this.apiUrl}/GetAllProducts`);  // GetAllProducts endpoint'ini kullanın
  }

  // Ürün ID'sine göre tek bir ürünü alıyoruz
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/GetProduct?id=${id}`);  // GetProduct endpoint'ini kullanın
  }

  // Yeni ürün ekliyoruz
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/AddProduct`, product);  // AddProduct endpoint'ini kullanın
  }

  // Ürün resmini ekliyoruz
  addProductImage(productId: number, imageUrl: string): Observable<any> {
    const body = { imageUrl };
    return this.http.put(`${this.apiUrl}/AddProductImage?productId=${productId}`, body);  // Resim eklemek için API
  }

  // Ürün resmini güncelliyoruz
  updateProductImage(productId: number, imageUrl: string): Observable<any> {
    const body = { imageUrl };
    return this.http.put(`${this.apiUrl}/UpdateProductImageUrl?productId=${productId}`, body);  // Resim güncelleme API'si
  }
}
