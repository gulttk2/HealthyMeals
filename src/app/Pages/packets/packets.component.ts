import { Component } from '@angular/core';
import { PacketDivComponent } from "../../Components/packet-div/packet-div.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-packets',
  templateUrl: './packets.component.html',
  styleUrls: ['./packets.component.css'],
  imports: [PacketDivComponent,CommonModule ]
})
export class PacketsComponent {
  packets = [
    { name: 'Paket 1', description: 'Açıklama 1', imgUrl: 'images/img-1.jpg' },
    { name: 'Paket 2', description: 'Açıklama 2', imgUrl: 'images/img-2.jpg' },
    { name: 'Paket 3', description: 'Açıklama 3', imgUrl: 'images/img-3.jpg' },
    { name: 'Paket 4', description: 'Açıklama 4', imgUrl: 'images/img-4.jpg' },
    { name: 'Paket 5', description: 'Açıklama 5', imgUrl: 'images/img-5.jpg' },
    { name: 'Paket 6', description: 'Açıklama 6', imgUrl: 'images/img-6.jpg' },
    { name: 'Paket 7', description: 'Açıklama 7', imgUrl: 'images/img-7.jpg' },
    { name: 'Paket 8', description: 'Açıklama 8', imgUrl: 'images/img-8.jpg' },
  ];
}
