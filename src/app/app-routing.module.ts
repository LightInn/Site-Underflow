import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/authentification/login/login.component';
import {RegisterComponent} from "./components/authentification/register/register.component";
import {ProfileComponent} from "./components/authentification/profile/profile.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {LandingComponent} from "./components/landing/landing.component";
import {FilesCreatesComponent} from "./components/files/files-creates/files-creates.component";
import {FilesDownloadComponent} from "./components/files/files-download/files-download.component";
import {CoursesSuggestsComponent} from "./components/courses/courses-suggests/courses-suggests.component";
import {CoursesCreatesComponent} from "./components/courses/courses-creates/courses-creates.component";
import {CoursesRegistrationsComponent} from "./components/courses/courses-registrations/courses-registrations.component";

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'accueil', component: LandingComponent},
  {path: 'creer-une-fiche', component: FilesCreatesComponent},
  {path: 'les-fiches', component: FilesDownloadComponent},
  {path: 'suggerer-un-cours', component: CoursesSuggestsComponent},
  {path: 'donner-un-cours', component: CoursesCreatesComponent},
  {path: 'les-cours', component: CoursesRegistrationsComponent},

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '**', component: NotFoundComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
