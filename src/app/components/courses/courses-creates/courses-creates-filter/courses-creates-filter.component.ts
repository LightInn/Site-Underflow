import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Suggest} from "../../../../interfaces/suggest";
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

  @Output() onSuggestPicked = new EventEmitter<any>();

  constructor(private suggestService: SuggestionsService,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.suggestService.suggests(true).subscribe(
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
    this.onSuggestPicked.emit(suggest);
    this.clickEvent()
  }
}
