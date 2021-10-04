import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseComponent } from './components/core/base/base.component';
import { BaseUnderTitleComponent } from './components/core/base/base-under-title/base-under-title.component';
import { BaseBottomCenterComponent } from './components/core/base/base-bottom-center/base-bottom-center.component';
import { BaseUnderIllustrationComponent } from './components/core/base/base-under-illustration/base-under-illustration.component';
import { CoursesSuggestsComponent } from './components/courses/courses-suggests/courses-suggests.component';
import { CoursesCreatesComponent } from './components/courses/courses-creates/courses-creates.component';
import { CoursesRegistrationsComponent } from './components/courses/courses-registrations/courses-registrations.component';
import { ButtonRouteurComponent } from './components/core/button-routeur/button-routeur.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    BaseUnderTitleComponent,
    BaseBottomCenterComponent,
    BaseUnderIllustrationComponent,
    CoursesSuggestsComponent,
    CoursesCreatesComponent,
    CoursesRegistrationsComponent,
    ButtonRouteurComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
