import {Component, Input, OnInit} from '@angular/core';
import {Courses} from "../../../../interfaces/course";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.scss']
})
export class AdminCoursesComponent implements OnInit {
  // *************** Declaration part ******************* //
  @Input() coursesList: Array<Courses> | undefined;
  display: boolean = true;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if(!this.coursesList){
      this.display = false;
    } else {
      this.display = true;
    }
  }

  change(course: Courses) {
    this.router.navigateByUrl(`/admin/course/${course.id}`);
  }

  delete(course: Courses) {
    // todo call api delete classes

  }

}
