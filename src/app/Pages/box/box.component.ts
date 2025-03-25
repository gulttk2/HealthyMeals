import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-box',
  imports: [CommonModule],
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }

  increaseQuantity(item: any) {
    this.cartService.increaseQuantity(item);
  }

  decreaseQuantity(item: any) {
    this.cartService.decreaseQuantity(item);
  }

  removeFromCart(item: any) {
    this.cartService.removeFromCart(item);
  }

  // Sepetteki ürünlerin toplam fiyatını hesapla
  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + (item.Price * item.Quantity), 0);
  }
  // Onayla butonuna tıklandığında yapılacak işlem
  onCheckout() {
    if (this.cartItems.length > 0) {
      console.log('Ödeme işlemi başlatıldı!');
      // this.router.navigate(['/payment']);
    } else {
      console.log('Sepet boş, ödeme işlemi başlatılamaz!');
    }
  }
}
