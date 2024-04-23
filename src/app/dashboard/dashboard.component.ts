import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SeminarService } from '../services/seminar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  seminarForm!: FormGroup;

  constructor(private seminarsService: SeminarService,private router: Router) { }

  ngOnInit(): void {
    this.seminarForm = new FormGroup({
      title: new FormControl(''),
      presenter: new FormControl(''),
      date: new FormControl(''),
      description: new FormControl('')
    });
  }

  onSubmit(): void {
    this.seminarsService.addSeminar(this.seminarForm.value).subscribe({
      next: (response) => {
          console.log('Response from server:', response);
          alert(response); // Alert the actual response text from the server
          this.router.navigateByUrl('/seminars');
          
      },
      error: (error) => {
          console.error('Error adding seminar', error);
          alert('Error adding seminar: ' + (error.error || error.message));
      }
  });
  
  }
}