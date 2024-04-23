import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');  // Checks if the user key exists in localStorage
  }

  onLogout(): void {
    localStorage.removeItem('user');  // Clears the stored user
    window.location.reload();  // Reloads the page to reflect the logged out state
  }
  
}
