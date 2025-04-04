import { ChangeDetectorRef, Component, TemplateRef } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DiscountService } from '../../services/discount.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  customer: any = { ID: 0, Name: '', Surname: '', Address: '', PhoneNumber: '', Email: '' };
  isAddingNew = true;
  discounts: any[] = [];
  orders: any[] = [];

  constructor(private profileService: ProfileService, private modalService: NgbModal,private discountService:DiscountService,  private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.getUserProfile();
  }
  

  openModal(content: TemplateRef<any>): void {
    this.isAddingNew = true;
    this.customer = { ID: 0, Name: '', Surname: '', Address: '', PhoneNumber: '', Email: '' };
    this.modalService.open(content);
  }

  editCustomer(customer: any, content: TemplateRef<any>): void {
    this.customer = { ...customer };
    this.isAddingNew = false;
    this.modalService.open(content);
  }

  saveCustomer(): void {
    if (this.isAddingNew) {
    } else {
      this.profileService.updateUserProfile(this.customer).subscribe(() => {
        this.getUserProfile();
        this.modalService.dismissAll();
      });
    }
  }

  getCoupons(): void {
    this.discountService.getDiscount().subscribe(data => {
      this.discounts = data;
    }, error => {
      console.error('Error fetching coupons', error);
    });
    console.log(this.discounts)
  }

  getOrders(): void {
    if (!this.customer || !this.customer.ID) {
      console.error('Kullanıcı bilgisi yüklenmemiş!');
      return;
    }
  
    const userId = this.customer.ID;
    console.log('Kullanıcı ID:', userId); // Debug için ekle
  
    this.profileService.getOrders(userId).subscribe(
      data => {
        this.orders = data;
        console.log('Order Data:', data);  // Burada order verisinin yapısını görebilirsiniz
      },
      error => {
        console.error('Error fetching user orders', error);
      }
    );
  }
  
  
  closeCoupons() {
    this.discounts = []; // Kuponları kaldırarak modalı kapat
  }
  closeOrders(){
    this.orders =[];

  }
  getUserProfile(): void {
    this.profileService.getUserProfile()?.subscribe(
      data => {
        console.log('Profil verisi:', data);
        this.customer = data;
        if (this.customer?.ID) {
          this.getOrders(); 
        }   
      },
      error => {
        console.error('Kullanıcı profili alınamadı:', error);
      }
    );
  }
  

  }




