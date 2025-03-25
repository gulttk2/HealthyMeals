import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();

  // Ürün sepete ekleme
  addToCart(product: any) {
    const currentItems = this.cartItems.value;
    // Eğer ürün zaten sepette varsa, sadece miktarını artır
    const existingProductIndex = currentItems.findIndex(item => item.ID === product.ID);
    if (existingProductIndex !== -1) {
      currentItems[existingProductIndex].Quantity += 1; // Miktar artışı
    } else {
      currentItems.push({ ...product, Quantity: 1 }); // Yeni ürün ekle
    }
    this.cartItems.next([...currentItems]);
  }

  // Ürün sepette çıkarma
  removeFromCart(product: any) {
    const currentItems = this.cartItems.value.filter(item => item.ID !== product.ID);
    this.cartItems.next(currentItems);
  }

  // Miktarı artırma
  increaseQuantity(product: any) {
    const currentItems = this.cartItems.value;
    const index = currentItems.findIndex(item => item.ID === product.ID);
    if (index !== -1) {
      currentItems[index].Quantity += 1;
      this.cartItems.next([...currentItems]);
    }
  }

  // Miktarı azaltma
  decreaseQuantity(product: any) {
    const currentItems = this.cartItems.value;
    const index = currentItems.findIndex(item => item.ID === product.ID);
    if (index !== -1 && currentItems[index].Quantity > 1) {
      currentItems[index].Quantity -= 1;
      this.cartItems.next([...currentItems]);
    }
  }

  // Sepetteki öğeleri al
  getCartItems() {
    return this.cartItems$;
  }
}
