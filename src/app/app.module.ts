import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {BaseComponent} from './components/core/base/base.component';
import {LoginComponent} from './components/authentification/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from './components/authentification/register/register.component';
import { ProfileComponent } from './components/authentification/profile/profile.component';
import {BaseUnderTitleComponent} from "./components/core/base/base-under-title/base-under-title.component";
import { LandingComponent } from './components/landing/landing.component';
import {CoursesCreatesComponent} from "./components/courses/courses-creates/courses-creates.component";
import { CoursesSuggestsComponent } from './components/courses/courses-suggests/courses-suggests.component';
import { ButtonRouteurComponent } from './components/core/button-routeur/button-routeur.component';
import { FilesCreatesComponent } from './components/files/files-creates/files-creates.component';
import { FilesDownloadComponent } from './components/files/files-download/files-download.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

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
    ButtonRouteurComponent,
    LandingComponent,
    ProfileComponent,
    FilesCreatesComponent,
    FilesDownloadComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
