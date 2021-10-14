import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {BaseComponent} from './components/core/base/base.component';
import {LoginComponent} from './components/authentification/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
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
import {HeaderComponent} from './components/core/header/header.component';
import {FooterComponent} from './components/core/footer/footer.component';
import {ToastComponent} from './components/core/toast/toast.component';
import {AuthentificationInterceptor} from './interceptors/authentification.interceptor'
import {ToastService} from "./services/toast.service";


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
    CoursesRegistrationsComponent,
    ToastComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthentificationInterceptor, multi: true},
    ToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
