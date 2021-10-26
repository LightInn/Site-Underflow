import {Component, OnInit} from '@angular/core';
import {Courses} from "../../../../interfaces/course";
import {ToastService} from "../../../../services/toast.service";
import {Router} from "@angular/router";
import {CourseSubscription} from "../../../../interfaces/courseSubscription";
import {User} from "../../../../interfaces/user";
import {CoursesService} from 'src/app/services/callAPI/courses.service';
import {RegistrationsCoursesService} from "../../../../services/callAPI/registrations-courses.service";
import {ClassesService} from "../../../../services/callAPI/classes.service";
import {UserService} from "../../../../services/callAPI/user.service";

@Component({
  selector: 'app-profile-inscriptions',
  templateUrl: './profile-courses-registrations.component.html',
  styleUrls: ['./profile-courses-registrations.component.scss']
})
export class ProfileCoursesRegistrationsComponent implements OnInit {
  // *************** Declaration part ******************* //
  currentUser: User = {id: "981477da-31c3-4887-b98f-6f9cc0f44e40"};
  courseInscription: Array<CourseSubscription> = [];
  coursesList?: Array<Courses> = [];
  checked: boolean = true;

  constructor(private toastService: ToastService,
              private router: Router,
              private classeService: ClassesService,
              private courseService: CoursesService,
              private subscriptionsService: RegistrationsCoursesService,
              private userService: UserService) {
  }


  ngOnInit(): void {
    this.courseService.courses().subscribe(
      courses => {
        this.coursesList = courses;
      }, error => {
        this.toastService.newToast(error.error.error, true);
      }
    );
    this.subscriptionsService.subscriptions(true).subscribe(
      subscriptions => {
        this.courseInscription = subscriptions;
      }, error => {
        this.toastService.newToast(error.error.error, true);
      }
    )
  }

  /**
   * elem check function -> we test if the user is already registred on the course
   * @param idElem
   */
  elemCheck(idElem?: number) {
    return (!!(this.courseInscription.find(({id}) => id === idElem)));
  }

  /**
   * If we clic on toggle button -> then toggle the inscription to the course
   * @param id
   */
  clickEvent(id?: number) {
    if (!!id) {
      this.subscriptionsService.requestUserSubscriptions({id: id}).subscribe(
        elem => {
          console.log(elem.subscribed)
          let message = elem.subscribed ? "Tu es inscrit !" : "Tu es désinscrit !";
          this.toastService.newToast(message, false);
        }, error => {
          this.toastService.newToast(error.error.error, true);
        }
      )
    }
  }

  checkEmpty(): boolean {
    // @ts-ignore
    return this.coursesList.length === 0;
  }
}
