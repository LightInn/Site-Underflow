import {Injectable} from '@angular/core';
import {ApiUrl} from "../../constants/api.url";
import {HttpClient} from "@angular/common/http";
import {Classe} from "../../interfaces/classe";
import {shareReplay} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  private cache$: Observable<Array<Classe>> | undefined;

  constructor(private http: HttpClient) {
  }

  /**
   * Get the list of all classes
   * @param reset -> true if you want to force the cache reset
   */
  classes(reset: boolean = false) {
    if (!this.cache$ || reset) {
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

  public requestClasseSpecific(id: number) {
    return this.http.get<Classe>(ApiUrl + '/classes/' + id).pipe(
    )
  }

  public requestUpdateClasseSpecific(id: number, classe: Classe) {
    return this.http.patch<Classe>(ApiUrl + '/classes/' + id, classe).pipe(
    )
  }
}
