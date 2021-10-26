import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map, shareReplay} from "rxjs/operators";
import {ApiUrl} from "../../constants/api.url";
import {Suggest} from "../../interfaces/suggest";

@Injectable({
  providedIn: 'root'
})
export class SuggestionsService {
  private cache$: Observable<Array<Suggest>> | undefined;

  constructor(private http: HttpClient) {
  }

  /**
   * Get the list of all suggestions
   * @param reset -> true if you want to force the cache reset
   */
  suggests(reset: boolean = false) {
    if (!this.cache$ || reset) {
      this.cache$ = this.requestSuggests().pipe(
        shareReplay(1)
      );
    }
    return this.cache$;
  }


  private requestSuggests() {
    return this.http.get<Array<Suggest>>(ApiUrl + '/propositions/').pipe(
    )
  }

  /**
   * Request to add a new suggestion
   * @param suggest -> give a complete suggestion
   */
  public addSuggestion(suggest: Suggest) {
    return this.http.post<unknown>(ApiUrl + '/proposition/', suggest).pipe(
    )
  }
}
