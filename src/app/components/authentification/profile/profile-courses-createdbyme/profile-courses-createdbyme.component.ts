import { Component, OnInit } from '@angular/core';
import {User} from "../../../../interfaces/user";
import {CourseSubscription} from "../../../../interfaces/courseSubscription";
import {Courses} from "../../../../interfaces/course";
import {ToastService} from "../../../../services/toast.service";
import {Router} from "@angular/router";
import {ClassesService} from "../../../../services/callAPI/classes.service";
import {CoursesService} from "../../../../services/callAPI/courses.service";
import {RegistrationsCoursesService} from "../../../../services/callAPI/registrations-courses.service";
import {UserService} from "../../../../services/callAPI/user.service";

@Component({
  selector: 'app-profile-courses-createdbyme',
  templateUrl: './profile-courses-createdbyme.component.html',
  styleUrls: ['./profile-courses-createdbyme.component.scss']
})
export class ProfileCoursesCreatedbymeComponent implements OnInit {
  // *************** Declaration part ******************* //
  coursesList?: Array<Courses> = [];

  constructor(private toastService: ToastService,
              private router: Router,
              private classeService: ClassesService,
              private courseService: CoursesService,) {
  }


  ngOnInit(): void {
    // this.courseService.requestCoursesCreated().subscribe(
    this.courseService.requestCoursesCreated().subscribe(
      courses => {
        this.coursesList = courses;
      }, error => {
        this.toastService.newToast(error.error.error, true);
      }
    );
  }

  checkEmpty(): boolean {
    // @ts-ignore
    return this.coursesList.length === 0;
  }
}
