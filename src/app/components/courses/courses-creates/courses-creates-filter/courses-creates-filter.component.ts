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

  toFormDateLocaleString(date:Date){
    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - (offset*60*1000))
    return date.toISOString().match(/^.*T[0-9]+:[0-9]+/)
  }

  clickEvent() {
    this.status = !this.status;
    document.getElementById('suggestDropDown')?.classList.toggle('fadeInvisible');
    document.getElementById('suggestDropDown')?.classList.toggle('fadeVisible');
  }

  clickSuggestEvent(suggest: Suggest) {
    // @ts-ignore
    document.forms["formCreate"]["title"].value=suggest.title;
    // @ts-ignore
    // document.forms["formCreate"]["date"].value=this.toFormDateLocaleString(suggest.date_butoir);
    document.forms["formCreate"]["date"].value=this.toFormDateLocaleString(new Date(Date.now()));
    // @ts-ignore
    document.forms["formCreate"]["classes"].value=suggest?.classe?.title;
    // @ts-ignore
    document.forms["formCreate"]["subjects"].value=suggest?.subject?.title;
    this.clickEvent()
  }

  constructor() {
  }

  ngOnInit(): void {
    this.suggestsList = [
      {
        id: 1,
        title: "titre",
        classe: {
          id: 1,
          title: "B1"
        },
        subject: {
          id: 1,
          title: "premier sujet"
        },
        date_butoir: (new Date(Date.now())).toDateString()
      },
      {
        id: 2,
        title: "titre",
        classe: {
          id: 2,
          title: "B2"
        },
        subject: {
          id: 2,
          title: "deuxième sujet"
        },
        date_butoir: (new Date(Date.now())).toDateString()
      },
      {
        id: 3,
        title: "titre",
        classe: {
          id: 3,
          title: "B3"
        },
        subject: {
          id: 3,
          title: "troisième sujet"
        },
        date_butoir: (new Date(Date.now())).toDateString()
      },
      {
        id: 4,
        title: "titre",
        classe: {
          id: 4,
          title: "B4"
        },
        subject: {
          id: 4,
          title: "quatrième sujet"
        },
        date_butoir: (new Date(Date.now())).toDateString()
      },
      {
        id: 5,
        title: "titre",
        classe: {
          id: 5,
          title: "B5"
        },
        subject: {
          id: 5,
          title: "cinquième sujet"
        },
        date_butoir: (new Date(Date.now())).toDateString()
      }
    ]
  }

}
