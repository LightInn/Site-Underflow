import {Component, Input, NgModule, OnInit} from '@angular/core';
// @ts-ignore
import {CourseSubscription} from "../../../../interfaces/courseSubscription";
import {Courses} from "../../../../interfaces/course";
import {Classe} from "../../../../interfaces/classe";
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-courses-registrations-filter',
  templateUrl: './courses-registrations-filter.component.html',
  styleUrls: ['./courses-registrations-filter.component.scss']
})
export class CoursesRegistrationsFilterComponent implements OnInit {
  @Input() courseInscription?: Array<CourseSubscription>;
  @Input() coursesList?: Array<Courses>;
  @Input() classesList?: Array<Classe>;




  // todo element dynamic
  selectedClasse: string = "B3";

  triggerFilter(event: any) {
    console.log(event);
    console.log("cc")
  }

  constructor() {

  }

  ngOnInit(): void {

  }


}
