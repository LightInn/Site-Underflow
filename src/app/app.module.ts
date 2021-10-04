import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {BaseComponent} from './components/core/base/base.component';
import {LoginComponent} from './components/authentification/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LandingComponent } from './components/landing/landing.component';
import { ButtonRouteurComponent } from './components/core/button-routeur/button-routeur.component';
import { CoursesRegistrationsComponent } from './components/courses/courses-registrations/courses-registrations.component';
import { CoursesCreatesComponent } from './components/courses/courses-creates/courses-creates.component';
import { CoursesSuggestsComponent } from './components/courses/courses-suggests/courses-suggests.component';
import { BaseUnderTitleComponent } from './components/core/base/base-under-title/base-under-title.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    LoginComponent,
    BaseUnderTitleComponent,
    CoursesSuggestsComponent,
    CoursesCreatesComponent,
    CoursesRegistrationsComponent,
    ButtonRouteurComponent,
    LandingComponent,
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
