import {Component, OnInit} from '@angular/core';
import {Suggest} from "../../../../interfaces/suggest";

@Component({
  selector: 'app-courses-creates-filter',
  templateUrl: './courses-creates-filter.component.html',
  styleUrls: ['./courses-creates-filter.component.scss']
})
export class CoursesCreatesFilterComponent implements OnInit {

  status?: boolean = false;
  suggestsList ?: Array<Suggest>;

  clickEvent() {
    this.status = !this.status;
    document.getElementById('suggestDropDown')?.classList.toggle('fadeInvisible');
    document.getElementById('suggestDropDown')?.classList.toggle('fadeVisible');
  }

  clickSuggestEvent(suggest: Suggest) {

  }

  constructor() {
  }

  ngOnInit(): void {
    this.suggestsList = [
      {
        id: 1,
        classe: {
          id: 1,
          title: "B1"
        },
        subject: {
          id: 1,
          title: "premier sujet"
        },
        date_butoir: new Date(Date.now())
      },
      {
        id: 2,
        classe: {
          id: 2,
          title: "B2"
        },
        subject: {
          id: 2,
          title: "deuxième sujet"
        },
        date_butoir: new Date(Date.now())
      },
      {
        id: 3,
        classe: {
          id: 3,
          title: "B3"
        },
        subject: {
          id: 3,
          title: "troisième sujet"
        },
        date_butoir: new Date(Date.now())
      },
      {
        id: 4,
        classe: {
          id: 4,
          title: "B4"
        },
        subject: {
          id: 4,
          title: "quatrième sujet"
        },
        date_butoir: new Date(Date.now())
      },
      {
        id: 5,
        classe: {
          id: 5,
          title: "B5"
        },
        subject: {
          id: 5,
          title: "cinquième sujet"
        },
        date_butoir: new Date(Date.now())
      }
    ]
  }

}
