import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Subject} from "../../interfaces/subject";
import {HttpClient} from "@angular/common/http";
import {shareReplay} from "rxjs/operators";
import {ApiUrl} from "../../constants/api.url";


@Injectable({
  providedIn: 'root'
})
export class SubjetsService {
  private cache$: Observable<Array<Subject>> | undefined;

  constructor(private http: HttpClient) {
  }

  get subjects() {
    if (!this.cache$) {
      this.cache$ = this.requestSubjects().pipe(
        shareReplay(1)
      );
    }
    return this.cache$;
  }

  private requestSubjects() {
    return this.http.get<Array<Subject>>(ApiUrl + '/subjects/').pipe(
    )
  }
}
