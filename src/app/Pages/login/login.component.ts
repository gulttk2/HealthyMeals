import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('container', { static: false }) container!: ElementRef;
  @ViewChild('signUp', { static: false }) signUpButton!: ElementRef;
  @ViewChild('signIn', { static: false }) signInButton!: ElementRef;

  signUpEmail: string = '';
  signUpPassword: string = '';
  confirmPassword: string = '';
  signInEmail: string = '';
  signInPassword: string = '';

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

    // Buton eventlerini ViewChild ile ekliyoruz
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
      alert('Passwords do not match');
      return;
    }
    this.authService.register(this.signUpEmail, this.signUpPassword).subscribe(
      response => {
        console.log('Registration successful', response);
        this.toggle();
      },
      error => {
        console.error('Registration error', error);
      }
    );
  }

  login() {
    this.authService.login(this.signInEmail, this.signInPassword).subscribe(
      response => {
        if (response.token) {
          console.log('Login successful', response);
          this.router.navigate(['/home']);
        }
      },
      error => {
        console.error('Login error', error);
      }
    );
  }
}
