import {Component, Input, OnInit} from '@angular/core';
import {Courses} from "../../../interfaces/course";

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.scss']
})
export class AdminCoursesComponent implements OnInit {
  @Input() coursesList: Array<Courses> | undefined;
  display: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
  }

}
