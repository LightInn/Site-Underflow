import {Component, OnInit} from '@angular/core';
import {Subject} from "../../interfaces/subject";
import {Classe} from "../../interfaces/classe";
import {User} from "../../interfaces/user";
import {Courses} from "../../interfaces/course";
import {ClassesService} from "../../services/callAPI/classes.service";
import {UserService} from "../../services/callAPI/user.service";
import {UsersService} from "../../services/callAPI/users.service";
import {SubjectsService} from "../../services/callAPI/subjects.service";
import {CoursesService} from "../../services/callAPI/courses.service";
import {ToastService} from "../../services/toast.service";
import {Suggest} from "../../interfaces/suggest";
import {SuggestionsService} from "../../services/callAPI/suggestions.service";

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
  // *************** Declaration part ******************* //
  classesList?: Array<Classe>;
  subjectslist?: Array<Subject>;
  actualUser?: User;
  userslist?: Array<User>;
  coursesList?: Array<Courses>;
  suggestsList?: Array<Suggest>;


  constructor(private toastService: ToastService,
              private classesService: ClassesService,
              private subjectsService: SubjectsService,
              private userInfoService: UserService,
              private usersService: UsersService,
              private coursesService: CoursesService,
              private suggestionsService: SuggestionsService) {
  }

  /**
   * Initialization of all data
   */
  ngOnInit(): void {
    this.classesService.classes(true).subscribe(
      response => {
        this.classesList = response;
      }, error => {
        this.toastService.newToast(error.error.status, true);
      }
    )
    this.subjectsService.subjects(true).subscribe(
      response => {
        this.subjectslist = response;
      }, error => {
        this.toastService.newToast(error.error.status, true);
      }
    )
    this.userInfoService.user(true).subscribe(
      response => {
        this.actualUser = response;
      }, error => {
        this.toastService.newToast(error.error.status, true);
      }
    )
    this.usersService.users(true).subscribe(
      response => {
        this.userslist = response;
      }, error => {
        this.toastService.newToast(error.error.status, true);
      }
    )
    this.coursesService.requestAllCourses().subscribe(
      response => {
        this.coursesList = response;
      }, error => {
        this.toastService.newToast(error.error.status, true);
      }
    )
    this.suggestionsService.suggests(true).subscribe(
      response => {
        this.suggestsList = response;
      }, error => {
        this.toastService.newToast(error.error.status, true);
      }
    )
  }

  // ******************************* RESET PART ********************************** //
  resetClasses() {
    this.classesService.classes(true).subscribe(
      response => {
        this.classesList = response;
      }, error => {
        this.toastService.newToast(error.error.status, true);
      }
    )
  }

  resetSubjects() {
    this.subjectsService.subjects(true).subscribe(
      response => {
        this.subjectslist = response;
      }, error => {
        this.toastService.newToast(error.error.status, true);
      }
    )
    this.userInfoService.user(true).subscribe(
      response => {
        this.actualUser = response;
      }, error => {
        this.toastService.newToast(error.error.status, true);
      }
    )
  }

  resetUsers() {
    this.usersService.users(true).subscribe(
      response => {
        this.userslist = response;
      }, error => {
        this.toastService.newToast(error.error.status, true);
      }
    )
  }

  resetCourses() {
    this.coursesService.requestAllCourses().subscribe(
      response => {
        this.coursesList = response;
      }, error => {
        this.toastService.newToast(error.error.status, true);
      }
    )
  }

  resetSuggestions() {
    this.suggestionsService.suggests(true).subscribe(
      response => {
        this.suggestsList = response;
      }, error => {
        this.toastService.newToast(error.error.status, true);
      }
    )
  }
}
