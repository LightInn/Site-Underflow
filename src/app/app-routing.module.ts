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
import {ConfirmationComponent} from './components/authentification/confirmation/confirmation.component';
import {ContributeComponent} from "./components/contribute/contribute.component";
import {AdminGuard} from './guards/admin.guard';
import {AddClasseComponent} from "./components/administration/add/add-classe/add-classe.component";
import {UserUpdateCourseComponent} from "./components/administration/updates/user-update-course/user-update-course.component";
import {AddSubjectComponent} from "./components/administration/add/add-subject/add-subject.component";
import {ForgotMailtoComponent} from "./components/authentification/forgot-pass/forgot-mailto/forgot-mailto.component";
import {ForgotChangePassComponent} from "./components/authentification/forgot-pass/forgot-change-pass/forgot-change-pass.component";
import {TokenConfirmComponent} from "./components/authentification/confirmation/token-confirm/token-confirm.component";
import {PreConfirmationComponent} from "./components/authentification/confirmation/pre-confirmation/pre-confirmation.component";
import { LegalMentionsComponent } from './components/legal-mentions/legal-mentions.component';
import {RGPDComponent} from "./components/rgpd/rgpd.component";

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
  {path: 'pre-confirmation', component: PreConfirmationComponent},
  {path: 'confirmation', component: ConfirmationComponent},
  {path: 'confirmation-mail/:token', component: TokenConfirmComponent},
  {path: 'profil', component: ProfileComponent, canActivate: [SecurityGuard]},
  {path: 'admin', component: AdministrationComponent, canActivate: [AdminGuard, SecurityGuard]},
  {path: 'admin/classe/:id', component: UpdateClasseComponent, canActivate: [AdminGuard, SecurityGuard]},
  {path: 'admin/course/:id', component: UpdateCourseComponent, canActivate: [AdminGuard, SecurityGuard]},
  {path: 'admin/subject/:id', component: UpdateSubjectComponent, canActivate: [AdminGuard, SecurityGuard]},
  {path: 'admin/add_classe', component: AddClasseComponent,canActivate: [AdminGuard, SecurityGuard]},
  {path: 'admin/add_subject', component: AddSubjectComponent,canActivate: [AdminGuard, SecurityGuard]},
  {path: 'contribute', component: ContributeComponent, canActivate: [SecurityGuard]},
  {path: 'user/course/:id', component: UserUpdateCourseComponent, canActivate: [SecurityGuard]},
  // {path: 'forgot/mailto', component: ForgotMailtoComponent},
  // {path: 'forgot/password_change', component: ForgotChangePassComponent},
  {path: 'mentions-legales', component: LegalMentionsComponent, canActivate: [SecurityGuard]},
  {path: 'rgpd', component: RGPDComponent, canActivate: [SecurityGuard]},
  {path: '**', component: NotFoundComponent, canActivate: [SecurityGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
