import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, ProductService } from '../../services/product-service.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-packets',
  standalone: true, 
  imports:[CommonModule],
  templateUrl: './packets.component.html',
  styleUrls: ['./packets.component.css']
})
export class PacketsComponent implements OnInit {

  packets: Product[] = [];  // Ürünleri tutacağımız dizi

  constructor(private packetService: ProductService,  private cartService: CartService) { }

  ngOnInit(): void {
    this.packetService.getProducts().subscribe((data: Product[]) => {
      this.packets = data;  // Veriyi component'te tutuyoruz
    });
  }
  increaseQuantity(packet: Product) {
    if (packet.Quantity < 3) {  // Maksimum miktar sınırı
      packet.Quantity++;
    }
  }

  decreaseQuantity(packet: Product) {
    if (packet.Quantity > 0) {  // Minimum miktar sınırı
      packet.Quantity--;
    }
  }
  addToCart(packet: any) {
    this.cartService.addToCart(packet);
  }
  
}
