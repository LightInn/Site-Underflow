import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/core/header/header.component';
import {FooterComponent} from './components/core/footer/footer.component';
import {BaseComponent} from './components/core/base/base.component';
import {LoginComponent} from './components/authentification/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from './components/authentification/register/register.component';
import {ProfileComponent} from './components/authentification/profile/profile.component';
import {BaseUnderTitleComponent} from "./components/core/base/base-under-title/base-under-title.component";
import {LandingComponent} from './components/landing/landing.component';
import {CoursesCreatesComponent} from "./components/courses/courses-creates/courses-creates.component";
import {CoursesSuggestsComponent} from './components/courses/courses-suggests/courses-suggests.component';
import {ButtonRouteurComponent} from './components/core/button-routeur/button-routeur.component';
import {CoursesRegistrationsComponent} from "./components/courses/courses-registrations/courses-registrations.component";
import {FilesCreatesComponent} from './components/files/files-creates/files-creates.component';
import {FilesDownloadComponent} from './components/files/files-download/files-download.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import { CoursesSuggestsFormComponent } from './components/courses/courses-suggests/courses-suggests-form/courses-suggests-form.component';
import { CoursesSuggestsFilterComponent } from './components/courses/courses-suggests/courses-suggests-filter/courses-suggests-filter.component';
import { CoursesCreatesFilterComponent } from './components/courses/courses-creates/courses-creates-filter/courses-creates-filter.component';
import { CoursesCreatesFormComponent } from './components/courses/courses-creates/courses-creates-form/courses-creates-form.component';
import { SuggestTraitedPipe } from './pipe/suggest-traited.pipe';
import { CoursesRegistrationsFormComponent } from './components/courses/courses-registrations/courses-registrations-form/courses-registrations-form.component';
import { CoursesRegistrationsFilterComponent } from './components/courses/courses-registrations/courses-registrations-filter/courses-registrations-filter.component';
import {ToastComponent} from './components/core/toast/toast.component';
import {AuthentificationInterceptor} from './interceptors/authentification.interceptor'
import {ToastService} from "./services/toast.service";
import { ProfileFormComponent } from './components/authentification/profile/profile-form/profile-form.component';
import { ProfileInscriptionsComponent } from './components/authentification/profile/profile-inscriptions/profile-inscriptions.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { AdminClassesComponent } from './components/administration/admin-classes/admin-classes.component';
import { AdminCoursesComponent } from './components/administration/admin-courses/admin-courses.component';
import { AdminUsersComponent } from './components/administration/admin-users/admin-users.component';
import { AdminSubjectsComponent } from './components/administration/admin-subjects/admin-subjects.component';
import { UserInfosPipe } from './pipe/user-infos.pipe';


@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    BaseUnderTitleComponent,
    BaseComponent,
    LandingComponent,
    CoursesCreatesComponent,
    CoursesSuggestsComponent,
    CoursesRegistrationsComponent,
    ButtonRouteurComponent,
    LandingComponent,
    ProfileComponent,
    FilesCreatesComponent,
    FilesDownloadComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    CoursesSuggestsFormComponent,
    CoursesSuggestsFilterComponent,
    CoursesCreatesFilterComponent,
    CoursesCreatesFormComponent,
    SuggestTraitedPipe,
    CoursesRegistrationsFormComponent,
    CoursesRegistrationsFilterComponent,
    CoursesRegistrationsComponent,
    ToastComponent,
    ProfileFormComponent,
    ProfileInscriptionsComponent,
    AdministrationComponent,
    AdminClassesComponent,
    AdminCoursesComponent,
    AdminUsersComponent,
    AdminSubjectsComponent,
    UserInfosPipe


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    Ng2SearchPipeModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthentificationInterceptor, multi: true},
    ToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
