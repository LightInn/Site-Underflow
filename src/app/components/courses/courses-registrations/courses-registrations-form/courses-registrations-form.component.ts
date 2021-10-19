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

@Component({
  selector: 'app-courses-registrations-form',
  templateUrl: './courses-registrations-form.component.html',
  styleUrls: ['./courses-registrations-form.component.scss']
})
export class CoursesRegistrationsFormComponent implements OnInit {

  // we init all elements
  coursesList?: Array<Courses> = [];
  coursesListFiltered?: Array<Courses> = [];
  coursesListFiltered_1?: Array<Courses> = [];
  coursesListFiltered_2?: Array<Courses> = [];
  coursesListFiltered_3?: Array<Courses> = [];
  courseInscription?: Array<CourseSubscription>;
  classesList?: Array<Classe>;
  filter_selectedClasse: string = 'B3';
  // date of the day
  filter_selectedDateStart: string = '';
  // 2 week more
  filter_selectedDateEnd: string = '';
  filter_searchBarText: string = '';

  constructor(private authService: AuthentificationService,
              private toastService: ToastService,
              private router: Router) {

  }


  ngOnInit(): void {
    // temporary data to test in developpement mode
    this.classesList = [
      {
        id: 1,
        title: "B1"
      },
      {
        id: 2,
        title: "B2"
      },
      {
        id: 3,
        title: "B3"
      }
    ]
    this.courseInscription = [
      {
        "id_user": "981477da-31c3-4887-b98f-6f9cc0f44e40",
        id_course: 1,
      },
      {
        "id_user": "981477da-31c3-4887-b98f-6f9cc0f44e40",
        id_course: 2,
      }
    ]
    this.coursesList = [
      {
        "classe": {
          "id": 3,
          "title": "B3"
        },
        "date_start": "Fri, 14 Oct 2021 10:19:52 GMT",
        "description": "Révision PHP",
        "duration": null,
        "ended": false,
        "id": 1,
        "salle": "102",
        "owner": {
          "activated": false,
          "admin": false,
          "alternative_id": "983f1a77-d44f-46df-b7e9-1b5a0952e56d",
          "classe": null,
          "created_on": "Wed, 06 Oct 2021 17:50:33 GMT",
          "email": "mathis.gauthier@epsi.fr",
          "first_name": "Mathis",
          "id": "981477da-31c3-4887-b98f-6f9cc0f44e40",
          "last_login": null,
          "last_name": "Gauthier"
        },
        "subject": {
          "id": 1,
          "proposePar": {
            "activated": false,
            "admin": false,
            "alternative_id": "983f1a77-d44f-46df-b7e9-1b5a0952e56d",
            "classe": null,
            "created_on": "Wed, 06 Oct 2021 17:50:33 GMT",
            "email": "mathis.gauthier@epsi.fr",
            "first_name": "Mathis",
            "id": "981477da-31c3-4887-b98f-6f9cc0f44e40",
            "last_login": null,
            "last_name": "Gauthier"
          },
          "title": "PHP",
          "validated": true
        },
        "title": "Cours PHP"
      },
      {
        "classe": {
          "id": 1,
          "title": "B1"
        },
        "date_start": "Fri, 22 Oct 2021 13:39:42 GMT",
        "description": "Révision JS",
        "duration": null,
        "ended": false,
        "id": 2,
        "salle": "108",
        "owner": {
          "activated": false,
          "admin": false,
          "alternative_id": "983f1a77-d44f-46df-b7e9-1b5a0952e56d",
          "classe": null,
          "created_on": "Wed, 06 Oct 2021 17:50:33 GMT",
          "email": "mathis.gauthier@epsi.fr",
          "first_name": "Mathis",
          "id": "981477da-31c3-4887-b98f-6f9cc0f44e40",
          "last_login": null,
          "last_name": "Gauthier"
        },
        "subject": {
          "id": 2,
          "proposePar": {
            "activated": false,
            "admin": false,
            "alternative_id": "983f1a77-d44f-46df-b7e9-1b5a0952e56d",
            "classe": null,
            "created_on": "Wed, 06 Oct 2021 17:50:33 GMT",
            "email": "mathis.gauthier@epsi.fr",
            "first_name": "Mathis",
            "id": "981477da-31c3-4887-b98f-6f9cc0f44e40",
            "last_login": null,
            "last_name": "Gauthier"
          },
          "title": "JS",
          "validated": true
        },
        "title": "Cours JS"
      }
    ]
    // We init the default values
    this.coursesListFiltered = JSON.parse(JSON.stringify(this.coursesList));
    const date = new Date(Date.now());
    this.filter_selectedDateStart = toFormDateLocaleString(date);
    this.filter_selectedDateEnd = toFormDateLocaleString(new Date(date.setDate(date.getDate() + 14)));

    // We init the filter with the defaults values
    this.callFilter(this.filter_selectedClasse, "classe");
    this.callFilter(this.filter_selectedDateStart, "dateStart");
    this.callFilter(this.filter_selectedDateEnd, "dateEnd");
    this.callFilter(this.filter_searchBarText, "BarText");
  }

  checkEmpty():boolean{
    // @ts-ignore
    return this.coursesListFiltered.length===0;
  }

  // this function check if the card is in the filtered list -> bind to ngif in template
  displayable(idToCheck: number) {
    if (!!this.coursesListFiltered?.find(({id}) => id === idToCheck)) {
      return true
    }
    return false;
  }

  // Update the coursesListFiltered -> deep copy
  updateDisplayable(courseToDisplayList: Array<Courses>) {
    this.coursesListFiltered = JSON.parse(JSON.stringify(courseToDisplayList));
  }


  // group of functions binded to child ( filter component )
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

  // function to filter via the classes selections -> use observable , filter from angular
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

  // same function for the date filter
  filterDate() {
    // @ts-ignore
    let courses$ = from(this.coursesListFiltered_1);
    console.log(this.filter_selectedDateStart)
    console.log(this.filter_selectedDateEnd)
    const date = new Date(Date.now());
    // reset date if it's falsy
    // @ts-ignore
    if ((this.filter_selectedDateStart) == false) {
      this.filter_selectedDateStart = toFormDateLocaleString(date);
    }
    // @ts-ignore
    if ((this.filter_selectedDateEnd) == false) {
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
        console.log(val);
        // @ts-ignore
        this.coursesListFiltered_2.push(val);
      }
    );
  }

  // same function of date & classes
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
        console.log(val);
        // @ts-ignore
        this.coursesListFiltered.push(val);
      }
    );
  }

  // After a clic on filter component
  callFilter(filterString: string, fromFilter: string) {
    console.log("--- call filter ---")
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

  // elem check function -> we test if the user is already registred on the course
  elemCheck(id?: number) {
    // if id is defined we test it
    if (!!id) {
      // @ts-ignore
      return !!(this.courseInscription.find(({id_course}) => id_course === id));
    }
    return false
  }

  // If we clic on toggle button -> then toggle the inscription to the course
  clickEvent(id?: number) {
    // @ts-ignore
    if (!!(this.courseInscription.find(({id_course}) => id_course === id))) {
      // call api to subcribe on course
      this.toastService.newToast("Inscription à un cours...", true)
    } else {
      // call api to unsubcribe on course
      this.toastService.newToast("Désinscription à un cours...", true)
    }
  }
}
