import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as moment from "moment";

import {User} from "../interfaces/user";
import {shareReplay} from "rxjs/operators";
import {CSRFToken} from "../interfaces/csrfToken";
import {JwTokenEncoded} from "../interfaces/jw-token";
import {ApiUrl} from "../constants/api.url";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  // *************** Declaration part ******************* //
  private expiresAt: moment.MomentInput;
  public static csrfToken: string;

  constructor(private http: HttpClient) {
  }

  /**
   * Get csrf token, (actualy disable)
   */
  getCSRF() {
    return this.http.get<CSRFToken>(ApiUrl + '/csrf-token/')
  }

  /**
   * Request the login, get the jwt token, keep session in memory
   * @param email
   * @param password
   */
  login(email: string, password: string) {
    return this.http.post<JwTokenEncoded>(ApiUrl + '/login/', {email, password}).pipe(
      shareReplay()
    )
  }

  /**
   * Request Register function, create the account
   * @param email
   * @param first_name
   * @param last_name
   * @param password
   */
  register(email: string, first_name: string, last_name: string, password: string) {
    return this.http.post<User>(ApiUrl + '/register/', {email, first_name, last_name, password}).pipe(
      shareReplay()
    )
  }

  /**
   * Set the jwt connect ( keep session in memory )
   * @param jwt
   */
  setSession(jwt: JwTokenEncoded) {
    localStorage.setItem('jwt', JSON.stringify(jwt));
  }

  /**
   * remove jwt token ( disconnect )
   */
  logout() {
    localStorage.removeItem("jwt");
  }

  /**
   * Check if the jwt token is set or not
   */
  public isLoggedIn() {
    return localStorage.getItem("jwt") != undefined;
  }

  /**
   * Request to send confirmation link
   * @param mail
   */
  public requestConfirmation(mail: {email:string}) {
    return this.http.post<any>(ApiUrl + '/confirmation-mail/', mail).pipe(
    )
  }

  /**
   * Request to validate the token
   * @param token
   */
  public requestTokenConfirmation(token: string) {
    return this.http.get<any>(ApiUrl + '/confirmation-mail/' + token).pipe(
    )
  }
}
