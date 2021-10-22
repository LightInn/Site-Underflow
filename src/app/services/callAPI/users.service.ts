import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../interfaces/user";
import {HttpClient} from "@angular/common/http";
import {shareReplay} from "rxjs/operators";
import {ApiUrl} from "../../constants/api.url";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private cache$: Observable<Array<User>> | undefined;

  constructor(private http: HttpClient) {
  }

  /**
   * Get list of users
   * @param reset -> true if you want to force the cache reset
   */
  users(reset: boolean = false) {
    if (!this.cache$) {
      this.cache$ = this.requestUsers().pipe(
        shareReplay(1)
      );
    }
    return this.cache$;
  }

  private requestUsers() {
    return this.http.get<Array<User>>(ApiUrl + '/users/').pipe(
    )
  }
}
