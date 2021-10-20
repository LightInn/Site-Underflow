import {Injectable} from '@angular/core';
import {ApiUrl} from "../../constants/api.url";
import {HttpClient} from "@angular/common/http";
import {Classe} from "../../interfaces/classe";
import {catchError, map, shareReplay} from "rxjs/operators";
import {Observable} from "rxjs";

const CACHE_SIZE = 1;

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  private cache$: Observable<Array<Classe>> | undefined;

  constructor(private http: HttpClient) {
  }

  get classes() {
    if (!this.cache$) {
      this.cache$ = this.requestClasses().pipe(
        shareReplay(1)
      );
    }
    return this.cache$;
  }

  private requestClasses() {
    return this.http.get<Array<Classe>>(ApiUrl + '/classes/').pipe(
    )
  }
}
