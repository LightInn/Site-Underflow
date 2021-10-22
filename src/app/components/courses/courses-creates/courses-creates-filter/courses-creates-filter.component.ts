import {Component, OnInit} from '@angular/core';
import {Suggest} from "../../../../interfaces/suggest";
import {toFormDateLocaleString} from "../../../../functions/dateFormat"
import {SuggestionsService} from "../../../../services/callAPI/suggestions.service";
import {ToastService} from "../../../../services/toast.service";

@Component({
  selector: 'app-courses-creates-filter',
  templateUrl: './courses-creates-filter.component.html',
  styleUrls: ['./courses-creates-filter.component.scss']
})
export class CoursesCreatesFilterComponent implements OnInit {
  // *************** Declaration part ******************* //
  status: boolean = false;
  suggestsList ?: Array<Suggest>;
  empty: boolean = true;

  constructor(private suggestService: SuggestionsService,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.suggestService.suggests().subscribe(
      suggests => {
        this.suggestsList = suggests;
        if (!!this.suggestsList) {
          this.empty = false;
        }
      }, error => {
        this.toastService.newToast(error.error.error, true);
      }
    )
  }

  clickEvent() {
    this.status = !this.status;
    document.getElementById('suggestDropDown')?.classList.toggle('fadeInvisible');
    document.getElementById('suggestDropDown')?.classList.toggle('fadeVisible');
  }

  clickSuggestEvent(suggest: Suggest) {
    // @ts-ignore
    document.forms["formCreate"]["title"].value = suggest.title;
    // @ts-ignore
    // document.forms["formCreate"]["date"].value=this.toFormDateLocaleString(suggest.date_butoir);
    document.forms["formCreate"]["date"].value = toFormDateLocaleString(new Date(Date.now()));
    // @ts-ignore
    document.forms["formCreate"]["classes"].value = suggest?.classe?.title;
    // @ts-ignore
    document.forms["formCreate"]["subjects"].value = suggest?.subject?.title;
    this.clickEvent()
  }
}
