import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';

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
import {CoursesRegistrationsComponent} from "./components/courses/courses-registrations/courses-registrations.component";
import {ButtonRouteurComponent} from './components/core/button-routeur/button-routeur.component';
import {FilesCreatesComponent} from './components/files/files-creates/files-creates.component';
import {FilesDownloadComponent} from './components/files/files-download/files-download.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import { HeaderComponent } from './components/core/header/header.component';
import { FooterComponent } from './components/core/footer/footer.component';
import { CoursesSuggestsFormComponent } from './components/courses/courses-suggests/courses-suggests-form/courses-suggests-form.component';
import { CoursesSuggestsFilterComponent } from './components/courses/courses-suggests/courses-suggests-filter/courses-suggests-filter.component';
import { CoursesCreatesFilterComponent } from './components/courses/courses-creates/courses-creates-filter/courses-creates-filter.component';
import { CoursesCreatesFormComponent } from './components/courses/courses-creates/courses-creates-form/courses-creates-form.component';
import { SuggestTraitedPipe } from './pipe/suggest-traited.pipe';
import { CoursesRegistrationsFormComponent } from './components/courses/courses-registrations/courses-registrations-form/courses-registrations-form.component';
import { CoursesRegistrationsFilterComponent } from './components/courses/courses-registrations/courses-registrations-filter/courses-registrations-filter.component';

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
