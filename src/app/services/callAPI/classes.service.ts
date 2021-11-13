import {Injectable} from '@angular/core';
import {ApiUrl} from "../../constants/api.url";
import {HttpClient} from "@angular/common/http";
import {Classe} from "../../interfaces/classe";
import {map, shareReplay} from "rxjs/operators";
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

  /**
   * Get all classes (call 'classes' if you want to get this route)
   * @private
   */
  private requestClasses() {
    return this.http.get<Array<Classe>>(ApiUrl + '/classes/').pipe(
    )
  }

  /**
   * Get specific classe from the id
   * @param id
   */
  public requestClasseSpecific(id: number) {
    return this.http.get<Array<Classe>>(ApiUrl + '/classes/').pipe(
      map(data => data.filter(classe => classe.id === id))
    )
  }

  /**
   * Update classe
   * @param classe
   */
  public requestUpdateClasseSpecific(classe: Classe) {
    return this.http.patch<Classe>(ApiUrl + '/admin/update_classe/', classe).pipe(
    )
  }

  /**
   * Delete classe
   * @param classe
   */
  public requestDeleteClasse(classe: Classe) {
    return this.http.delete<Classe>(ApiUrl + '/admin/delete_classe/', {body: {id: classe.id}}).pipe(
    )
  }

  /**
   * Add classe
   * @param classe
   */
  public requestAddClasse(classe: Classe) {
    return this.http.post<Classe>(ApiUrl + '/admin/classe/', classe).pipe(
    )
  }
}
