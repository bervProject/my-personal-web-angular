import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EducationComponent } from './education/education.component';


const routes: Routes = [
  { path: 'education', component: EducationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
