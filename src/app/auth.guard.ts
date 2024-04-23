import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (this.isLoggedIn()) {
      return true;
    } else {
      window.alert("You are not logged in. Please log in to access the dashboard."); // Show an alert message
      this.router.navigate(['/login']); // Redirect to login page
      return false;
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user'); // Checks if user is logged in
  }
}
