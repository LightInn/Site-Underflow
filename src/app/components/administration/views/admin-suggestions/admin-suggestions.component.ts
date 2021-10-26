import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {Suggest} from "../../../../interfaces/suggest";
import {ToastService} from "../../../../services/toast.service";
import {SuggestionsService} from "../../../../services/callAPI/suggestions.service";

@Component({
  selector: 'app-admin-suggestions',
  templateUrl: './admin-suggestions.component.html',
  styleUrls: ['./admin-suggestions.component.scss']
})
export class AdminSuggestionsComponent implements OnInit {
  // *************** Declaration part ******************* //
  @Input() suggestsList: Array<Suggest> | undefined;
  display: boolean = true;

  @Output() emitResetCallback_suggestion = new EventEmitter();
  validation: boolean = false;
  suggestionToDelete: Suggest = {};

  constructor(private router: Router,
              private suggestionsService: SuggestionsService,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    if(this.suggestsList?.length){
      this.display = false;
    } else {
      this.display = true;
    }
  }

  clickDelete(suggestion: Suggest){
    this.validation = true;
    this.suggestionToDelete = suggestion;
  }

  delete() {
    // todo call api delete course
    this.suggestionsService.requestDeleteSuggest(this.suggestionToDelete).subscribe(
      response => {
        this.validation = false;
        this.toastService.newToast("Suggestion bien supprimée", false);
        this.emitResetCallback_suggestion.emit();
      }, error => {
        this.validation = false;
        this.toastService.newToast("La suggestion possède encore des liens", true);
      }
    )
  }
}
