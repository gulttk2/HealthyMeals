import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../product-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-packets',
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
  
}
