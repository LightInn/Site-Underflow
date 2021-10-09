import {Component, Input, NgModule, OnInit, Output, EventEmitter} from '@angular/core';
// @ts-ignore
import {CourseSubscription} from "../../../../interfaces/courseSubscription";
import {Courses} from "../../../../interfaces/course";
import {Classe} from "../../../../interfaces/classe";
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';
import {sanitizeString} from "../../../../functions/sanitizeString";
import {sanitizeDate} from "../../../../functions/sanitizeDate";

@Component({
  selector: 'app-courses-registrations-filter',
  templateUrl: './courses-registrations-filter.component.html',
  styleUrls: ['./courses-registrations-filter.component.scss']
})
export class CoursesRegistrationsFilterComponent implements OnInit {
  // init input elements
  @Input() courseInscription?: Array<CourseSubscription>;
  @Input() coursesList?: Array<Courses>;
  @Input() classesList?: Array<Classe>;
  // todo element dynamic -> depend from the actual user
  @Input() filter_selectedClasse: string = "B3";
  @Input() filter_selectedDateStart?: string;
  @Input() filter_selectedDateEnd?: string;
  @Input() filter_searchBarText?: string = "";

  // emit event to double way data binding, we also sanitize entries
  @Output()
  triggeredClasse = new EventEmitter<string>();
  uploadEventClasse(event:any){
    event = sanitizeString(event)
    this.triggeredClasse.emit(event);
  }
  @Output()
  triggeredDateStart = new EventEmitter<string>();
  uploadEventDateStart(event:any){
    event = sanitizeDate(event)
    this.triggeredDateStart.emit(event);
  }
  @Output()
  triggeredDateEnd = new EventEmitter<string>();
  uploadEventDateEnd(event:any){
    event = sanitizeDate(event)
    this.triggeredDateEnd.emit(event);
  }
  @Output()
  triggeredBarText = new EventEmitter<string>();
  uploadEventBarText(event:any){
    event = sanitizeString(event)
    this.triggeredBarText.emit(event);
  }


  constructor() {

  }

  ngOnInit(): void {
  }


}
