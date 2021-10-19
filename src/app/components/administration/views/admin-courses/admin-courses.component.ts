import {Component, Input, OnInit} from '@angular/core';
import {Courses} from "../../../../interfaces/course";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.scss']
})
export class AdminCoursesComponent implements OnInit {
  @Input() coursesList: Array<Courses> | undefined;
  display: boolean = true;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  change(course:Courses){
    this.router.navigateByUrl(`/admin/course/${course.id}`);
  }

  delete(course:Courses){
    // todo call api delete classes

  }

}
