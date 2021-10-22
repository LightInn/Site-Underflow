import {Component, OnInit} from '@angular/core';
import {Courses} from "../../../../interfaces/course";
import {Classe} from "../../../../interfaces/classe";
import {AuthentificationService} from "../../../../services/authentification.service";
import {ToastService} from "../../../../services/toast.service";
import {Router} from "@angular/router";
import {CourseSubscription} from "../../../../interfaces/courseSubscription";
import {User} from "../../../../interfaces/user";
import {CoursesService} from 'src/app/services/callAPI/courses.service';
import {RegistrationsCoursesService} from "../../../../services/callAPI/registrations-courses.service";

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

  constructor(
    private authService: AuthentificationService,
    private toastService: ToastService,
    private router: Router,
    private coursesService: CoursesService,
    private courseRegistrationService: RegistrationsCoursesService) {
  }

  ngOnInit(): void {
    this.coursesService.courses().subscribe(
      courses => {
        this.coursesList = courses;
      }, error => {
        this.toastService.newToast(error.error.error, true);
      }
    );
    this.courseRegistrationService.subscriptions().subscribe(
      subscriptions => {
        this.courseInscription = subscriptions;
      }, error => {
        this.toastService.newToast(error.error.error, true);
      }
    )
  }

  // elem check function -> we test if the user is already registred on the course
  elemCheck(id?: number) {
    return (!!(this.courseInscription.find(({id_course}) => id_course === id)));
  }

  // If we clic on toggle button -> then toggle the inscription to the course
  clickEvent(id?: number) {
    if (!!(this.courseInscription.find(({id_course}) => id_course === id))) {
      // call api to unsubcribe on course
      this.courseInscription.splice(this.courseInscription.findIndex(({id_course}) => id_course === id), 1);
    } else {
      // call api to subcribe on course
      this.courseInscription.push({id_course: id, id_user: this.currentUser.id})
    }
    if (!!id) {
      this.courseRegistrationService.requestUserSubscriptions(id).subscribe(
        elem => {
          const message = elem ? "Tu es inscrit !" : "Tu es désinscrit !";
          this.toastService.newToast(message, true);
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
