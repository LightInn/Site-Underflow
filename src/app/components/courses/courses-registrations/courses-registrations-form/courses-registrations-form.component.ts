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
    console.log("elem check" + id)
    if (!!id) {
      console.log("true elem" + id)
      // @ts-ignore
      return !!(this.courseInscription.find(({id_course}) => id_course === id));
    }
    console.log("false elem" + id)
    return false
  }

  constructor() {
    this.courseInscription = [
      {
        "id_user": "981477da-31c3-4887-b98f-6f9cc0f44e40",
        id_course: 1,
      }
    ]
    console.log("Constructeur")
    console.log(this.courseInscription)
    this.coursesList = [
      {
        "classe": {
          "id": 1,
          "title": "B1"
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

  clickEvent(id?: number) {
    console.log("clickEvent")
    console.log(id)
    console.log(this.courseInscription)
    // if (!!(this.courseInscription?.find(({id_course}) => id_course === id))) {
    //   console.log(this.courseInscription?.splice(this.courseInscription?.findIndex(({id_course}) => id_course === id), id));
    // }
    // console.log(this.courseInscription);
  }

  ngOnInit(): void {

  }
}
