import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map, shareReplay} from "rxjs/operators";
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
    if (!this.cache$ || reset) {
      this.cache$ = this.requestCourses().pipe(
        shareReplay(1)
      );
    }
    return this.cache$;
  }

  private requestCourses() {
    return this.http.get<Array<Courses>>(ApiUrl + '/user/available_courses/').pipe(
    )
  }

  public addCourse(course: Courses) {
    return this.http.post<Courses>(ApiUrl + '/course/', course).pipe(
    )
  }

  public requestAllCourses() {
    return this.http.get<Array<Courses>>(ApiUrl + '/courses/').pipe(
    )
  }

  public requestCoursesCreated() {
    return this.http.get<Array<Courses>>(ApiUrl + '/user/courses/').pipe(
    )
  }

  public requestCourseSpecific(id: number) {
    return this.http.get<Array<Courses>>(ApiUrl + '/courses/').pipe(
      map(data => data.filter(courses => courses.id === id))
    )
  }

  public requestUpdateCourseSpecific(id: number, course: Courses) {
    return this.http.patch<Courses>(ApiUrl + '/courses/' + id, course).pipe(
    )
  }

  public requestDeleteCourse(course: Courses) {
    return this.http.delete<Courses>(ApiUrl + '/admin/delete_course/', {body: {id: course.id}}).pipe(
    )
  }

  public requestClotureCourse(course_id: number) {
    return this.http.post<any>(ApiUrl + '/course/' + course_id + "/cloture/", null).pipe(
    )
  }
}
