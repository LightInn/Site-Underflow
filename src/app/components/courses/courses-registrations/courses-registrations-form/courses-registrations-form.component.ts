import {Component, OnInit} from '@angular/core';
import {Courses} from "../../../../interfaces/course";
import {CourseSubscription} from "../../../../interfaces/CourseSubscription";

@Component({
  selector: 'app-courses-registrations-form',
  templateUrl: './courses-registrations-form.component.html',
  styleUrls: ['./courses-registrations-form.component.scss']
})
export class CoursesRegistrationsFormComponent implements OnInit {
  coursesList?: Array<Courses>;
  courseInscription?: Array<CourseSubscription>;

  elemCheck(id?: number) {
    // console.log("----------------------------")
    // console.log("elem check" + id)
    // if id is defined we test it
    if (!!id) {
      // console.log("true elem" + id)
      // // if the id is present in courseInscription
      // // @ts-ignore
      // console.log(!!(this.courseInscription.find(({id_course}) => id_course === id)));
      // // @ts-ignore
      // console.log(this.courseInscription.find(({id_course}) => id_course === id));
      // @ts-ignore
      return !!(this.courseInscription.find(({id_course}) => id_course === id));
    }
    // console.log("false elem" + id)
    return false
  }

  constructor() {}

  clickEvent(id?: number) {
    // @ts-ignore
    if(!!(this.courseInscription.find(({id_course})=>id_course === id))){
      // call api to subcribe on course

    } else {
      // call api to unsubcribe on course

    }

  }

  ngOnInit(): void {
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
  }
}
