import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (result: any) => {
        console.log('Login successful', result);
        localStorage.setItem('user', this.username); // Store the username
        alert('Successfully connected');
        this.router.navigateByUrl('/seminars'); // Navigate to home
      },
      error: (error: any) => {
        console.error('Login failed', error);
        alert('Login failed');
      }
    });
  }
}
