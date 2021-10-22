import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Suggest} from "../../../../interfaces/suggest";

@Component({
  selector: 'app-admin-suggestions',
  templateUrl: './admin-suggestions.component.html',
  styleUrls: ['./admin-suggestions.component.scss']
})
export class AdminSuggestionsComponent implements OnInit {
  // *************** Declaration part ******************* //
  @Input() suggestsList: Array<Suggest> | undefined;
  display: boolean = true;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if(!this.suggestsList){
      this.display = false;
    } else {
      this.display = true;
    }
  }

  delete(suggestions: Suggest) {
    // todo call api delete classes

  }
}
