import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { EducationComponent } from './education/education.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'education',
    component: EducationComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [MsalGuard]
  },
  {
    path: '',
    component: HomeComponent
  },
];

const isIframe = window !== window.parent && !window.opener;
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    relativeLinkResolution: 'legacy',
    initialNavigation: !isIframe ? 'enabledNonBlocking' : 'disabled' // Don't perform initial navigation in iframes
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
