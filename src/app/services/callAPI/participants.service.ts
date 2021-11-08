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

  /**
   * Get list of participant on a specific course ( call 'participants()' if you want this )
   * @param idCourse
   * @private
   */
  private requestParticipants(idCourse: number) {
    return this.http.get<Array<User>>(ApiUrl + '/course/' + idCourse + '/participants/').pipe(
    )
  }

  /**
   * Toggle attendance of a specific people on a specific course
   * @param idCourse
   * @param email
   */
  public requestToggleUserAttendance(idCourse: number, email: string) {
    return this.http.patch<{ "present"?: boolean }>(ApiUrl + '/course/' + idCourse + '/user_attendance/', {email: email}).pipe(
    )
  }
}
