import {Component, Input, OnInit} from '@angular/core';
import {Courses} from "../../../../interfaces/course";
import {CourseSubscription} from "../../../../interfaces/courseSubscription";
import {Classe} from "../../../../interfaces/classe";
import {from} from "rxjs";
import {filter} from "rxjs/operators";
import {toFormDateLocaleString} from "../../../../functions/dateFormat"
import {AuthentificationService} from "../../../../services/authentification.service";
import {ToastService} from "../../../../services/toast.service";
import {Router} from "@angular/router";
import {ClassesService} from "../../../../services/callAPI/classes.service";
import {SubjectsService} from "../../../../services/callAPI/subjects.service";
import {RegistrationsCoursesService} from "../../../../services/callAPI/registrations-courses.service";
import {CoursesService} from "../../../../services/callAPI/courses.service";
import {UserService} from "../../../../services/callAPI/user.service";
import {User} from "../../../../interfaces/user";
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-courses-registrations-form',
  templateUrl: './courses-registrations-form.component.html',
  styleUrls: ['./courses-registrations-form.component.scss']
})
export class CoursesRegistrationsFormComponent implements OnInit {
  // *************** Declaration part ******************* //
  coursesList?: Array<Courses>;
  classesList?: Array<Classe>;
  courseInscription?: Array<CourseSubscription>;
  userInfos?: User;

  coursesListFiltered?: Array<Courses> = [];
  coursesListFiltered_1?: Array<Courses> = [];
  coursesListFiltered_2?: Array<Courses> = [];
  coursesListFiltered_3?: Array<Courses> = [];

  filter_selectedClasse: string = '';
  filter_selectedDateStart: string = '';
  filter_selectedDateEnd: string = '';
  filter_searchBarText: string = '';

  constructor(private toastService: ToastService,
              private router: Router,
              private classeService: ClassesService,
              private courseService: CoursesService,
              private subscriptionsService: RegistrationsCoursesService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    // Init all dates & filters -> default values
    const date = new Date(Date.now());
    this.filter_selectedDateStart = toFormDateLocaleString(date);
    this.filter_selectedDateEnd = toFormDateLocaleString(new Date(date.setDate(date.getDate() + 14)));

    // **************** Call all needed services ****************** //
    this.classeService.classes().subscribe(
      classes => {
        this.classesList = classes;
      }, error => {
        this.toastService.newToast(error.error.error, true);
      }
    )
    this.courseService.courses(true).subscribe(
      courses => {
        this.coursesList = courses;
        // We init the default values
        this.coursesListFiltered = JSON.parse(JSON.stringify(this.coursesList));
      }, error => {
        this.toastService.newToast(error.error.error, true);
      }
    )
    this.subscriptionsService.subscriptions(true).subscribe(
      subscriptions => {
        this.courseInscription = subscriptions;
      }, error => {
        this.toastService.newToast(error.error.error, true);
      }
    )
    this.userService.user(true).subscribe(
      user => {
        this.userInfos = user;
        // When all informations from user are ok, we can init filters
        this.filter_selectedClasse = !!(user.classe?.title) ? user.classe.title : '';
        // We init the filter
        this.callFilter(this.filter_selectedClasse, "classe");
        this.callFilter(this.filter_selectedDateStart, "dateStart");
        this.callFilter(this.filter_selectedDateEnd, "dateEnd");
        this.callFilter(this.filter_searchBarText, "BarText");
      }, error => {
        this.toastService.newToast(error.error.error, true);
      }
    )
  }

  checkEmpty(): boolean {
    // @ts-ignore
    return this.coursesListFiltered.length === 0;
  }

  /**
   * this function check if the card is in the filtered list -> bind to ngif in template
   * @param idToCheck
   */
  displayable(idToCheck: number) {
    if (!!this.coursesListFiltered?.find(({id}) => id === idToCheck)) {
      return true
    }
    return false;
  }

  /**
   * this function copy the Array of element to display in the list of courses
   * Update the coursesListFiltered -> deep copy
   * @param courseToDisplayList
   */
  updateDisplayable(courseToDisplayList: Array<Courses>) {
    this.coursesListFiltered = JSON.parse(JSON.stringify(courseToDisplayList));
  }

  // *************** group of functions binded to child ( filter component ) ****************** //
  triggerFilter(event: any, from: string) {
    this.callFilter(event, from);
  }

  triggerFilterClasse(event: any) {
    this.triggerFilter(event, "classe")
  }

  triggerFilterDateStart(event: any) {
    this.triggerFilter(event, "dateStart")
  }

  triggerFilterDateEnd(event: any) {
    this.triggerFilter(event, "dateEnd")
  }

  triggerFilterBarText(event: any) {
    this.triggerFilter(event, "BarText")
  }

  /**
   * function to filter via the classes selections -> use observable , filter from angular
   */
  filterClasse() {
    // @ts-ignore
    let courses$ = from(this.coursesList);
    // if the selected classe, we skip the filter part
    if (this.filter_selectedClasse === "") {
      this.coursesListFiltered_1 = JSON.parse(JSON.stringify(this.coursesList));
    } else {
      let filteredClasses$ = courses$
        .pipe(filter(course => course["classe"]["title"] === this.filter_selectedClasse));
      filteredClasses$.subscribe(val => {
          // @ts-ignore
          this.coursesListFiltered_1.push(val);
        }
      );
    }
  }

  /**
   * same function for the date filter
   */
  filterDate() {
    // @ts-ignore
    let courses$ = from(this.coursesListFiltered_1);
    const date = new Date(Date.now());
    // reset date if it's falsy
    // @ts-ignore
    if ((this.filter_selectedDateStart) === false) {
      this.filter_selectedDateStart = toFormDateLocaleString(date);
    }
    // @ts-ignore
    if ((this.filter_selectedDateEnd) === false) {
      this.filter_selectedDateEnd = toFormDateLocaleString(new Date(date.setDate(date.getDate() + 14)));
    }
    // @ts-ignore
    let filteredClasses$ = courses$
      .pipe(
        filter(course => (
            ((new Date(course["date_start"])).getTime()) >= ((new Date(this.filter_selectedDateStart)).getTime())
            &&
            ((new Date(course["date_start"]).getTime()) <= ((new Date(this.filter_selectedDateEnd)).getTime())
            )
          )
        )
      );
    filteredClasses$.subscribe(val => {
        // @ts-ignore
        this.coursesListFiltered_2.push(val);
      }
    );
  }

  /**
   * same function of date & classes
   * @param search
   */
  filterBarText(search: string) {
    // @ts-ignore
    let courses$ = from(this.coursesListFiltered_2);
    search = search.toLowerCase();
    // @ts-ignore
    let filteredClasses$ = courses$
      .pipe(
        filter(course => course.description.toLowerCase().includes(search) || course.title.toLowerCase().includes(search) ||
          course.subject.title.toLowerCase().includes(search))
      );
    filteredClasses$.subscribe(val => {
        // @ts-ignore
        this.coursesListFiltered.push(val);
      }
    );
  }

  /**
   * After a clic on filter component, we call all filters
   * @param filterString
   * @param fromFilter
   */
  callFilter(filterString: string, fromFilter: string) {
    // We reset all lists
    this.coursesListFiltered = [];
    this.coursesListFiltered_1 = [];
    this.coursesListFiltered_2 = [];
    this.coursesListFiltered_3 = [];
    // we update all variables
    if (fromFilter === "classe") {
      this.filter_selectedClasse = filterString;
    } else if (fromFilter === "dateStart") {
      this.filter_selectedDateStart = filterString;
    } else if (fromFilter === "dateEnd") {
      this.filter_selectedDateEnd = filterString;
    } else if (fromFilter === "BarText") {
      this.filter_searchBarText = filterString;
    }
    // Then we trigger filters functions
    this.filterClasse();
    this.filterDate();
    if (!!this.filter_searchBarText) {
      this.filterBarText(this.filter_searchBarText);
      this.updateDisplayable(this.coursesListFiltered);
    } else {
      this.updateDisplayable(this.coursesListFiltered_2);
    }
  }

  /**
   * elem check function -> we test if the user is already registred on the course
   * @param id_course
   */
  elemCheck(id_course?: number) {
    // if id is defined we test it
    if (!!id_course) {
      // @ts-ignore
      return !!(this.courseInscription?.find(({id}) => id === id_course));
    }
    return false
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
}
