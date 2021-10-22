import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {shareReplay} from "rxjs/operators";
import {ApiUrl} from "../../constants/api.url";
import {User} from "../../interfaces/user";
import {UserPassword} from "../../interfaces/userPassword";

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
    if (!this.cache$) {
      this.cache$ = this.requestUser().pipe(
        shareReplay(1)
      );
    }
    return this.cache$;
  }

  private requestUser() {
    return this.http.get<User>(ApiUrl + '/user/profile/').pipe(
    )
  }

  public update(user: User) {
    return this.http.patch<User>(ApiUrl + '/user/profile/', user).pipe(
    )
  }

  public updatePassword(passwords: UserPassword) {
    return this.http.patch<UserPassword>(ApiUrl + '/user/profile/', passwords).pipe(
    )
  }
}
