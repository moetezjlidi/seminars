import { Component } from '@angular/core';
import { SeminarService } from '../services/seminar.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditSeminarDialogComponent } from '../edit-seminar-dialog/edit-seminar-dialog.component';


@Component({
  selector: 'app-seminar-list',
  templateUrl: './seminar-list.component.html',
  styleUrl: './seminar-list.component.css'
})
export class SeminarListComponent {
  seminars: any[] = [];

  constructor(private seminarService: SeminarService,private router: Router, public dialog: MatDialog) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user'); // Simplistic check; consider using a more secure method
  }
  // In your Angular component
  ngOnInit(): void {
    this.seminarService.getSeminars().subscribe({
      next: (data) => {
        // Assuming the data should be an array; check and assign it
        this.seminars = Array.isArray(data) ? data : [data]; // Fallback for non-array response
      },
      error: (error) => console.error('Error fetching seminars:', error)
    });
  }
  deleteSeminar(id: number): void {
    this.seminarService.deleteSeminar(id).subscribe({
      next: (response) => {
        this.seminars = this.seminars.filter(seminar => seminar.id !== id);
        alert(response); // Alert the actual response text from the server
        this.router.navigateByUrl('/seminars');
         // Update the list after deletion
      },
      error: (error) => console.error('Failed to delete the seminar', error)
    });
  }
  
  openEditDialog(seminar: any): void {
    const dialogRef = this.dialog.open(EditSeminarDialogComponent, {
      width: '250px',
      data: seminar,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog result:', result);
        this.updateSeminar(seminar.id, result);
      }
    });
  }

  
  updateSeminar(id: number, seminarData: any): void {
    this.seminarService.updateSeminar(id, seminarData).subscribe({
      next: (response) => {
        const index = this.seminars.findIndex(seminar => seminar.id === id);
        if (index !== -1) {
          this.seminars[index] = { ...this.seminars[index], ...seminarData };
        }
        console.log('Seminar updated successfully:', response);
        // Optionally, show a success message
      },
      error: (error) => {
        console.error('Error updating seminar:', error);
        // Optionally, handle errors, e.g., show an error message
      }
    });
  }
}
