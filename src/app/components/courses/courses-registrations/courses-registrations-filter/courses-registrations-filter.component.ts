import {Component, Input, NgModule, OnInit, Output, EventEmitter} from '@angular/core';
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
  @Input() filter_selectedClasse: string = "B3";
  // todo element dynamic
  @Input() filter_selectedDateStart?: string;
  // todo element dynamic
  @Input() filter_selectedDateEnd?: string;
  // todo element dynamic
  @Input() filter_searchBarText?: string = "";

  @Output()
  triggeredClasse = new EventEmitter<string>();
  uploadEventClasse(event:any){
    this.triggeredClasse.emit(event);
  }
  @Output()
  triggeredDateStart = new EventEmitter<string>();
  uploadEventDateStart(event:any){
    this.triggeredDateStart.emit(event);
  }
  @Output()
  triggeredDateEnd = new EventEmitter<string>();
  uploadEventDateEnd(event:any){
    this.triggeredDateEnd.emit(event);
  }
  @Output()
  triggeredBarText = new EventEmitter<string>();
  uploadEventBarText(event:any){
    this.triggeredBarText.emit(event);
  }


  constructor() {

  }

  ngOnInit(): void {
  }


}
