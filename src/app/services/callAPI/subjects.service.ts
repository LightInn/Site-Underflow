import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Subject} from "../../interfaces/subject";
import {HttpClient} from "@angular/common/http";
import {map, shareReplay} from "rxjs/operators";
import {ApiUrl} from "../../constants/api.url";

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  private cache$: Observable<Array<Subject>> | undefined;

  constructor(private http: HttpClient) {
  }

  /**
   * Get the list of all subjects
   * @param reset -> true if you want to force the cache reset
   */
  subjects(reset: boolean = false) {
    if (!this.cache$ || reset) {
      this.cache$ = this.requestSubjects().pipe(
        shareReplay(1)
      );
    }
    return this.cache$;
  }

  /**
   * Get all subjects ( call 'subjects()' to get this )
   * @private
   */
  private requestSubjects() {
    return this.http.get<Array<Subject>>(ApiUrl + '/subject/').pipe(
    )
  }

  /**
   * Request to add a new subject
   * @param subject -> give a complete subject
   */
  public addSubject(subject: Subject) {
    return this.http.post<Subject>(ApiUrl + '/subject/', subject).pipe(
    )
  }

  /**
   * Get specific subject
   * @param id
   */
  public requestSubjectSpecific(id: number) {
    return this.http.get<Array<Subject>>(ApiUrl + '/subject/').pipe(
      map(data=>data.filter(subject=>subject.id === id))
    )
  }

  /**
   * Update specific subject
   * @param id
   * @param subject
   */
  public requestUpdateSubjectSpecific(id: number, subject: Subject) {
    return this.http.patch<Subject>(ApiUrl + '/subject/' + id, subject).pipe(
    )
  }

  /**
   * Delete subject
   * @param subject
   */
  public requestDeleteSubject(subject: Subject) {
    return this.http.delete<Subject>(ApiUrl + '/admin/delete_subject/', {body: {id: subject.id}}).pipe(
    )
  }
}

