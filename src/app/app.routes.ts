import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { EducationComponent } from './education/education.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  { path: 'education', component: EducationComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [MsalGuard] },
  { path: '', component: HomeComponent }
];
