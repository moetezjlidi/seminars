import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'; // Adjust the path as necessary
import { DashboardComponent } from './dashboard/dashboard.component';
import { SeminarListComponent } from './seminar-list/seminar-list.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
 // Redirect to home by default
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
  { path: 'seminars',component:SeminarListComponent },
  
  // other routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
