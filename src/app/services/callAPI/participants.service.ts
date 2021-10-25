import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {shareReplay} from "rxjs/operators";
import {ApiUrl} from "../../constants/api.url";
import {User} from "../../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {
  private cache$: Observable<Array<User>> | undefined;

  constructor(private http: HttpClient) {
  }

  /**
   * Get the list of all participants for a specific courseID
   * @param idCourse -> number Id of the specific course
   * @param reset -> true if you want to force the cache reset
   */
  participants(idCourse: number, reset: boolean = false) {
    if (!this.cache$ || reset) {
      this.cache$ = this.requestParticipants(idCourse).pipe(
        shareReplay(1)
      );
    }
    return this.cache$;
  }

  private requestParticipants(idCourse: number) {
    return this.http.get<Array<User>>(ApiUrl + '/course/' + idCourse + '/participants/').pipe(
    )
  }
}
