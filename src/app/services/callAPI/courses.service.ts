import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {shareReplay} from "rxjs/operators";
import {ApiUrl} from "../../constants/api.url";
import {Courses} from "../../interfaces/course";

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private cache$: Observable<Array<Courses>> | undefined;

  constructor(private http: HttpClient) {
  }

  /**
   * Get the list of all courses
   * @param reset -> true if you want to force the cache reset
   */
  courses(reset: boolean = false) {
    if (!this.cache$) {
      this.cache$ = this.requestCourses().pipe(
        shareReplay(1)
      );
    }
    return this.cache$;
  }

  private requestCourses() {
    return this.http.get<Array<Courses>>(ApiUrl + '/courses/').pipe(
    )
  }

  public addCourse(course: Courses) {
    return this.http.post<Courses>(ApiUrl + '/course/', course).pipe(
    )
  }
}
