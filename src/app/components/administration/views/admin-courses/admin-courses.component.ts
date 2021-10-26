import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Courses} from "../../../../interfaces/course";
import {Router} from "@angular/router";
import {ToastService} from "../../../../services/toast.service";
import {CoursesService} from "../../../../services/callAPI/courses.service";

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.scss']
})
export class AdminCoursesComponent implements OnInit {
  // *************** Declaration part ******************* //
  @Input() coursesList: Array<Courses> | undefined;
  display: boolean = true;

  @Output() emitResetCallback_course = new EventEmitter();
  validation: boolean = false;
  courseToDelete: Courses = {};

  constructor(private router: Router,
              private courseService: CoursesService,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    if(this.coursesList?.length){
      this.display = false;
    } else {
      this.display = true;
    }
  }

  change(course: Courses) {
    this.router.navigateByUrl(`/admin/course/${course.id}`);
  }

  clickDelete(course: Courses) {
    this.validation = true;
    this.courseToDelete = course;
  }

  delete() {
    // todo call api delete course
    this.courseService.requestDeleteCourse(this.courseToDelete).subscribe(
      response => {
        this.validation = false;
        this.toastService.newToast("Course bien supprimée", false);
        this.emitResetCallback_course.emit();
      }, error => {
        this.validation = false;
        this.toastService.newToast("La course possède encore des liens", true);
      }
    )
  }
}
