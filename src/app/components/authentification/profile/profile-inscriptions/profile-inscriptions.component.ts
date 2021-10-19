import {Component, OnInit} from '@angular/core';
import {Courses} from "../../../../interfaces/course";
import {Classe} from "../../../../interfaces/classe";
import {AuthentificationService} from "../../../../services/authentification.service";
import {ToastService} from "../../../../services/toast.service";
import {Router} from "@angular/router";
import {CourseSubscription} from "../../../../interfaces/courseSubscription";
import {User} from "../../../../interfaces/user";

@Component({
  selector: 'app-profile-inscriptions',
  templateUrl: './profile-inscriptions.component.html',
  styleUrls: ['./profile-inscriptions.component.scss']
})
export class ProfileInscriptionsComponent implements OnInit {
  currentUser : User = {id:"981477da-31c3-4887-b98f-6f9cc0f44e40"};
  courseInscription: Array<CourseSubscription> = [];
  coursesList?: Array<Courses> = [];
  checked: boolean = true;

  // elem check function -> we test if the user is already registred on the course
  elemCheck(id?: number) {
    // if id is defined we test it
    // if (!!id) {
    //   // @ts-ignore
      return (!!(this.courseInscription.find(({id_course}) => id_course === id)));
    // }
    // return false
  }

  // If we clic on toggle button -> then toggle the inscription to the course
  clickEvent(id?: number) {
    if (!!(this.courseInscription.find(({id_course}) => id_course === id))) {
      // call api to unsubcribe on course
      this.courseInscription.splice(this.courseInscription.findIndex(({id_course}) => id_course === id),1);
    } else {
      // call api to subcribe on course
      this.courseInscription.push({id_course:id,id_user:this.currentUser.id})
    }
  }

  constructor(
    private authService: AuthentificationService,
    private toastService: ToastService,
    private router: Router
  ) {

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
  }
}
