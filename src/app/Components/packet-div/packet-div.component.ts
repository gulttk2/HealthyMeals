import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-packet-div',
  imports:[CommonModule],
  templateUrl: './packet-div.component.html',
  styleUrls: ['./packet-div.component.css']
})
export class PacketDivComponent {
  @Input() packet: { name: string; description: string; imgUrl: string } = { name: '', description: '', imgUrl: '' };

  quantity: number = 0;

  increaseQuantity() {
    if (this.quantity < 4) {
      this.quantity++;
    } else {
      alert('Sepete 4 den fazla ürün eklenemez');
    }
  }

  decreaseQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

  addToCart() {
    alert(`Sepete ${this.quantity} adet eklendi!`);
  }
}
