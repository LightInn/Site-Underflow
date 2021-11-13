import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {shareReplay} from "rxjs/operators";
import {ApiUrl} from "../../constants/api.url";
import {User} from "../../interfaces/user";
import {UserPassword} from "../../interfaces/userPassword";
import {UserInfo} from "../../interfaces/userInfo";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private cache$: Observable<User> | undefined;

  constructor(private http: HttpClient) {
  }

  /**
   * Get all data for actual user
   * @param reset -> true if you want to force the cache reset
   */
  user(reset: boolean = false) {
    if (!this.cache$ || reset) {
      this.cache$ = this.requestUser().pipe(
        shareReplay(1)
      );
    }
    return this.cache$;
  }

  /**
   * Get user informations ( call 'user()' to get this )
   * @private
   */
  private requestUser() {
    return this.http.get<User>(ApiUrl + '/user/profile/').pipe(
    )
  }

  /**
   * update user informations
   * @param user
   */
  public update(user: UserInfo) {
    return this.http.patch<UserInfo>(ApiUrl + '/user/profile/edit/', user).pipe(
    )
  }

  /**
   * Update password
   * @param passwords
   */
  public updatePassword(passwords: UserPassword) {
    return this.http.patch<UserPassword>(ApiUrl + '/user/profile/', passwords).pipe(
    )
  }
}
