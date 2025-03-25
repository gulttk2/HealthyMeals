import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, ProductService } from '../../services/product-service.service';

@Component({
  selector: 'app-packets',
  standalone: true, 
  imports:[CommonModule],
  templateUrl: './packets.component.html',
  styleUrls: ['./packets.component.css']
})
export class PacketsComponent implements OnInit {

  packets: Product[] = [];  // Ürünleri tutacağımız dizi

  constructor(private packetService: ProductService) { }

  ngOnInit(): void {
    debugger
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

  addToCart(packet: Product) {
    console.log(`${packet.Name} sepete eklendi!`);
    // Sepet ekleme işlemleri burada yapılabilir
  }
  
}
