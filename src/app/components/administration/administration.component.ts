import {Component, OnInit} from '@angular/core';
import {Subject} from "../../interfaces/subject";
import {Classe} from "../../interfaces/classe";
import {User} from "../../interfaces/user";
import {toFormDateLocaleString} from "../../functions/dateFormat";
import {Courses} from "../../interfaces/course";

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
  subjectslist: Array<Subject>;
  classesList: Array<Classe>;
  actualUser: User = {
    id: "981477da-31c3-4887-b98f-6f9cc0f44e40",
    first_name: "Andy",
    last_name: "Cinquin",
    admin: true,
    classe: {id: 3, title: "B3"}
  }
  userslist: Array<User>;
  coursesList: Array<Courses>;

  constructor() {
    this.subjectslist = [];
    this.classesList = [];
    this.subjectslist = [
      {
        id: 1,
        title: "premier matière",
        proposePar: this.actualUser
      },
      {
        id: 2,
        title: "deuxième matière",
        proposePar: this.actualUser
      },
      {
        id: 3,
        title: "troisième matière",
        proposePar: this.actualUser
      }
    ]
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
    this.userslist =
      [{
        id: "981477da-31c3-4887-b98f-6f9cc0f44e40",
        first_name: "Andy",
        last_name: "Cinquin",
        admin: true,
        classe: this.classesList[2],
        activated: true,
        alternative_id: "981477da-31c3-4887-b98f-6f9cc0f44e40-alt",
        created_on: "2018-01-01T",
        email: "andy.cinquin@epsi.fr",
        last_login: toFormDateLocaleString(new Date(Date.now()))
      }]
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

  ngOnInit(): void {

  }

}
