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
import {AdministrationComponent} from "./components/administration/administration.component";
import {SecurityGuard} from "./guards/security.guard";
import {UpdateClasseComponent} from "./components/administration/updates/update-classe/update-classe.component";
import {UpdateCourseComponent} from "./components/administration/updates/update-course/update-course.component";
import {UpdateSubjectComponent} from "./components/administration/updates/update-subject/update-subject.component";

const routes: Routes = [
  {path: '', component: LandingComponent, canActivate: [SecurityGuard]},
  {path: 'accueil', component: LandingComponent, canActivate: [SecurityGuard]},
  {path: 'creer-une-fiche', component: FilesCreatesComponent, canActivate: [SecurityGuard]},
  {path: 'les-fiches', component: FilesDownloadComponent, canActivate: [SecurityGuard]},
  {path: 'suggerer-un-cours', component: CoursesSuggestsComponent, canActivate: [SecurityGuard]},
  {path: 'donner-un-cours', component: CoursesCreatesComponent, canActivate: [SecurityGuard]},
  {path: 'les-cours', component: CoursesRegistrationsComponent, canActivate: [SecurityGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [SecurityGuard]},
  {path: 'admin', component: AdministrationComponent, canActivate: [SecurityGuard]},
  {path: 'admin/classe/:id', component: UpdateClasseComponent, canActivate: [SecurityGuard]},
  {path: 'admin/course/:id', component: UpdateCourseComponent, canActivate: [SecurityGuard]},
  {path: 'admin/subject/:id', component: UpdateSubjectComponent, canActivate: [SecurityGuard]},
  {path: 'userowner/course/:id', component: UpdateCourseComponent, canActivate: [SecurityGuard]},
  {path: '**', component: NotFoundComponent, canActivate: [SecurityGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
