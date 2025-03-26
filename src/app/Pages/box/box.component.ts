import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { DiscountService, Discount } from '../../services/discount.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-box',
  imports: [CommonModule, FormsModule],
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {
  cartItems: any[] = [];
  discountCode: string = '';
  discountAmount: number = 0;
  validDiscountCodes: { [key: string]: number } = {}; // İndirim miktarları TL olarak

  constructor(private cartService: CartService, private discountService: DiscountService, private router:Router) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });

    // DiscountService üzerinden indirimleri çekiyoruz
    this.discountService.getDiscount().subscribe((discounts: Discount[]) => {
      // API'den gelen indirimleri validDiscountCodes'a atıyoruz (TL cinsinden)
      this.validDiscountCodes = discounts.reduce((acc, discount) => {
        acc[discount.Name] = discount.DiscountAmount; // DiscountAmount artık TL olarak olacak
        return acc;
      }, {} as { [key: string]: number });
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
    const totalPrice = this.cartItems.reduce((total, item) => total + (item.Price * item.Quantity), 0);
    return totalPrice - this.discountAmount;  // İndirimli fiyatı hesapla
  }

  // Onayla butonuna tıklandığında yapılacak işlem
  onCheckout() {
    if (this.cartItems.length > 0) {
      console.log('Ödeme işlemi başlatılıyor!');

      // // Kullanıcı oturumu açmış mı diye kontrol et
      // const isLoggedIn = localStorage.getItem('isLoggedIn'); // veya sessionStorage kullanabilirsiniz
      // if (isLoggedIn === 'true') {
      //   // Giriş yapmışsa ödeme sayfasına yönlendir
      //   this.router.navigate(['/payment']);
      // } else {
      //   // Giriş yapmamışsa login sayfasına yönlendir
      //   this.router.navigate(['/login']);
      // }
    } else {
      console.log('Sepet boş, ödeme işlemi başlatılamaz!');
    }
  }

  applyDiscount() {
    // Geçerli indirim kodu olup olmadığını kontrol et
    if (this.validDiscountCodes[this.discountCode]) {
      this.discountAmount = this.validDiscountCodes[this.discountCode]; // Oran değil, doğrudan TL olarak indirim
      alert(`İndirim uygulandı! Yeni toplam: ${this.getTotalPrice()} ₺`);
    } else {
      alert('Geçersiz indirim kodu!');
    }
  }
}
