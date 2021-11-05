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

  /**
   * Get all available courses ( all courses that aren't created by me ) - from the jwt token
   * @private
   */
  private requestCourses() {
    return this.http.get<Array<Courses>>(ApiUrl + '/user/available_courses/').pipe(
    )
  }

  /**
   * Add course
   * @param course
   */
  public addCourse(course: Courses) {
    return this.http.post<Courses>(ApiUrl + '/course/', course).pipe(
    )
  }

  /**
   * Get all courses
   */
  public requestAllCourses() {
    return this.http.get<Array<Courses>>(ApiUrl + '/courses/').pipe(
    )
  }

  /**
   * Request to get all 'my Created' courses, from the jwt token
   */
  public requestCoursesCreated() {
    return this.http.get<Array<Courses>>(ApiUrl + '/user/courses/').pipe(
    )
  }

  /**
   * Get 1 specific course from the id
   * @param id
   */
  public requestCourseSpecific(id: number) {
    return this.http.get<Array<Courses>>(ApiUrl + '/courses/').pipe(
      map(data => data.filter(courses => courses.id === id))
    )
  }

  /**
   * Update 1 specific course
   * @param id
   * @param course
   */
  public requestUpdateCourseSpecific(id: number, course: Courses) {
    return this.http.patch<Courses>(ApiUrl + '/courses/' + id, course).pipe(
    )
  }

  /**
   * Delete 1 course
   * @param course
   */
  public requestDeleteCourse(course: Courses) {
    return this.http.delete<Courses>(ApiUrl + '/admin/delete_course/', {body: {id: course.id}}).pipe(
    )
  }

  /**
   * Closing a course [end]
   * @param course_id
   */
  public requestClotureCourse(course_id: number) {
    return this.http.post<any>(ApiUrl + '/course/' + course_id + "/cloture/", null).pipe(
    )
  }
}
