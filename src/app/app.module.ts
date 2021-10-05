import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseComponent } from './components/core/base/base.component';
import { BaseUnderTitleComponent } from './components/core/base/base-under-title/base-under-title.component';
import { CoursesSuggestsComponent } from './components/courses/courses-suggests/courses-suggests.component';
import { CoursesCreatesComponent } from './components/courses/courses-creates/courses-creates.component';
import { CoursesRegistrationsComponent } from './components/courses/courses-registrations/courses-registrations.component';
import { ButtonRouteurComponent } from './components/core/button-routeur/button-routeur.component';
import { LandingComponent } from './components/landing/landing.component';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { FilesCreatesComponent } from './components/files/files-creates/files-creates.component';
import { FilesDownloadComponent } from './components/files/files-download/files-download.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    BaseUnderTitleComponent,
    CoursesSuggestsComponent,
    CoursesCreatesComponent,
    CoursesRegistrationsComponent,
    ButtonRouteurComponent,
    LandingComponent,
    ProfileComponent,
    FilesCreatesComponent,
    FilesDownloadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
