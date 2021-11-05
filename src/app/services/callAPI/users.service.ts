import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../interfaces/user";
import {HttpClient} from "@angular/common/http";
import {shareReplay} from "rxjs/operators";
import {ApiUrl} from "../../constants/api.url";
import {Suggest} from "../../interfaces/suggest";

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
    if (!this.cache$ || reset) {
      this.cache$ = this.requestUsers().pipe(
        shareReplay(1)
      );
    }
    return this.cache$;
  }

  /**
   * Get all users ( call 'users()' to get this )
   * @private
   */
  private requestUsers() {
    return this.http.get<Array<User>>(ApiUrl + '/admin/users/').pipe(
    )
  }

  /**
   * Delete user
   * @param user
   */
  public requestDeleteUser(user: User) {
    return this.http.delete<User>(ApiUrl + '/admin/delete_user/', {body: {email: user.email}}).pipe(
    )
  }
}
