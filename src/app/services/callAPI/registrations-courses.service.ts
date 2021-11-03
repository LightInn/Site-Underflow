import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {shareReplay} from "rxjs/operators";
import {ApiUrl} from "../../constants/api.url";
import {CourseSubscription} from "../../interfaces/courseSubscription";
import {Courses} from "../../interfaces/course";

@Injectable({
  providedIn: 'root'
})
export class RegistrationsCoursesService {
  private cache$: Observable<Array<CourseSubscription>> | undefined;

  constructor(private http: HttpClient) {
  }

  /**
   * Get all subscriptions for the actual user
   * @param reset -> true if you want to force the cache reset
   */
  subscriptions(reset: boolean = false) {
    if (!this.cache$ || reset) {
      this.cache$ = this.requestSubscriptions().pipe(
        shareReplay(1)
      );
    }
    return this.cache$;
  }

  private requestSubscriptions() {
    return this.http.get<Array<CourseSubscription>>(ApiUrl + '/user/subscriptions/').pipe(
    )
  }

  /**
   * this function is used to toggle the subscription for a course on the actual user
   * it use the token of authentication to change the subcription state on the good user
   * @param courseId > Send the course id if you want to toggle your subscription state
   */
  public requestUserSubscriptions(course: Courses) {
    return this.http.post<{ subscribed: boolean }>(ApiUrl + '/subscription/', course).pipe(
    )
  }
}
