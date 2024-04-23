import { Component, OnInit } from '@angular/core';
import { SeminarService } from './services/seminar.service'; // Adjust the path according to your project structure

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
 
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user'); // Checks if user is logged in
  }

  getUsername(): string {
    return localStorage.getItem('user') || ''; // Returns an empty string if null
  }

  onLogout(): void {
    localStorage.removeItem('user'); // Clears the stored username
    window.location.reload(); // Reloads the page
  }
}
