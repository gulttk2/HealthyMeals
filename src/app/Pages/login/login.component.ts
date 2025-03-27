import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports:[CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('container', { static: false }) container!: ElementRef;
  @ViewChild('signUp', { static: false }) signUpButton!: ElementRef;
  @ViewChild('signIn', { static: false }) signInButton!: ElementRef;

  signUpName = '';
  signUpSurname = '';
  signUpPhoneNumber = '';
  signUpAddress = '';
  signUpEmail = '';
  signUpPassword = '';
  confirmPassword = '';
  signInEmail = '';
  signInPassword = '';

  constructor(private authService: AuthenticationService, private router: Router) {}

  toggle() {
    if (this.container) {
      this.container.nativeElement.classList.toggle('sign-in');
      this.container.nativeElement.classList.toggle('sign-up');
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.container) {
        this.container.nativeElement.classList.add('sign-in');
      }
    }, 200);

    if (this.signUpButton && this.signInButton && this.container) {
      this.signUpButton.nativeElement.addEventListener('click', () => {
        this.container.nativeElement.classList.add('right-panel-active');
      });

      this.signInButton.nativeElement.addEventListener('click', () => {
        this.container.nativeElement.classList.remove('right-panel-active');
      });
    }
  }

  register() {
    if (this.signUpPassword !== this.confirmPassword) {
      alert('Şifreler uyuşmuyor.');
      return;
    }

    const registerData = {
      Name: this.signUpName,
      Surname: this.signUpSurname,
      PhoneNumber: this.signUpPhoneNumber,
      Address: this.signUpAddress,
      Email: this.signUpEmail,
      Password: this.signUpPassword
    };

    this.authService.register(registerData).subscribe(
      response => {
        console.log('Kayıt başarılı', response);
        this.toggle();
      },
      error => {
        console.error('Kayıt hatası', error);
        alert('Kayıt işlemi sırasında bir hata oluştu.');
      }
    );
  }

  login() {
    const loginData = {
      Email: this.signInEmail,
      Password: this.signInPassword
    };

    this.authService.login(loginData.Email, loginData.Password).subscribe(
      response => {
        if (response.token) {
          console.log('Giriş başarılı', response);
          this.router.navigate(['/home']);
        }
      },
      error => {
        console.error('Giriş hatası', error);
      }
    );
  }
}