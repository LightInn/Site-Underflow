import {Component, OnInit} from '@angular/core';
import {Courses} from "../../../../interfaces/course";
import {CourseSubscription} from "../../../../interfaces/courseSubscription";
import {Classe} from "../../../../interfaces/classe";
import {from} from "rxjs";
import {filter} from "rxjs/operators";
import {CardState} from "../../../../interfaces/cardState";

@Component({
  selector: 'app-courses-registrations-form',
  templateUrl: './courses-registrations-form.component.html',
  styleUrls: ['./courses-registrations-form.component.scss']
})
export class CoursesRegistrationsFormComponent implements OnInit {
  coursesList?: Array<Courses>;
  courseInscription?: Array<CourseSubscription>;
  classesList?: Array<Classe>;
  displayable?:Array<CardState> = [];

  elemCheck(id?: number) {
    // if id is defined we test it
    if (!!id) {
      // @ts-ignore
      return !!(this.courseInscription.find(({id_course}) => id_course === id));
    }
    return false
  }

  callFilter(){
    console.log(this.classesList);
    // @ts-ignore
    const courses$ = from(this.classesList);
    console.log(courses$)
    const filteredClasses$ = courses$
      .pipe(filter(classes => classes.title==="B3"));
    const subscribe = filteredClasses$.subscribe(val =>console.log(val))

    // console.log(subscribe)
    // const source = from([
    //   { name: 'Joe', age: 31 },
    //   { name: 'Bob', age: 25 }
    // ]);
    // //filter out people with age under 30
    // const example = source.pipe(filter(person => person.age >= 30));
    // //output: "Over 30: Joe"
    // const subscribe = example.subscribe(val => console.log(`Over 30: ${val.name}`));
  }
  constructor() {

  }

  clickEvent(id?: number) {
    // @ts-ignore
    if(!!(this.courseInscription.find(({id_course})=>id_course === id))){
      // call api to subcribe on course

    } else {
      // call api to unsubcribe on course

    }

  }

  ngOnInit(): void {
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
        "date_start": "Fri, 08 Oct 2021 10:19:52 GMT",
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
        "date_start": "Fri, 08 Oct 2021 13:39:42 GMT",
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
    for (const course of this.coursesList) {
      // if the course is already push with the state -> then just skip the process
      console.log("init courses");
      console.log(course.id);
      // @ts-ignore
      console.log(this.displayable.find(id_course=>id_course===course.id))
      // // @ts-ignore
      // if(!!(this.displayable.find(id_course=>id_course===course.id)))
      // {
      //   // @ts-ignore
      //   this.displayable.push({id:course.id,state:true})
      // }
    }
    this.callFilter();
  }
}
