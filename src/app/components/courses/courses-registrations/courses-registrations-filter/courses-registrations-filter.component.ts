import {Component, Input, NgModule, OnInit, Output, EventEmitter} from '@angular/core';
// @ts-ignore
import {CourseSubscription} from "../../../../interfaces/courseSubscription";
import {Courses} from "../../../../interfaces/course";
import {Classe} from "../../../../interfaces/classe";
import {from} from 'rxjs';
import {filter} from 'rxjs/operators';
import {sanitizeString} from "../../../../functions/sanitizeString";
import {sanitizeDate} from "../../../../functions/sanitizeDate";

@Component({
  selector: 'app-courses-registrations-filter',
  templateUrl: './courses-registrations-filter.component.html',
  styleUrls: ['./courses-registrations-filter.component.scss']
})
export class CoursesRegistrationsFilterComponent implements OnInit {
  // *************** Declaration part ******************* //
  @Input() courseInscription?: Array<CourseSubscription>;
  @Input() coursesList?: Array<Courses>;
  @Input() classesList?: Array<Classe>;
  // todo element dynamic -> depend from the actual user
  @Input() filter_selectedClasse: string = "B3";
  @Input() filter_selectedDateStart?: string;
  @Input() filter_selectedDateEnd?: string;
  @Input() filter_searchBarText?: string = "";

  // emit event to double way data binding, we also sanitize entries
  @Output() triggeredClasse = new EventEmitter<string>();
  @Output() triggeredDateStart = new EventEmitter<string>();
  @Output() triggeredDateEnd = new EventEmitter<string>();
  @Output() triggeredBarText = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  uploadEventClasse(event: any) {
    event = sanitizeString(event)
    this.triggeredClasse.emit(event);
  }

  uploadEventDateStart(event: any) {
    event = sanitizeDate(event)
    this.triggeredDateStart.emit(event);
  }

  uploadEventDateEnd(event: any) {
    event = sanitizeDate(event)
    this.triggeredDateEnd.emit(event);
  }

  uploadEventBarText(event: any) {
    event = sanitizeString(event)
    this.triggeredBarText.emit(event);
  }
}