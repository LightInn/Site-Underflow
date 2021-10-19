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
  private expiresAt: moment.MomentInput;
  public static csrfToken: string;


  constructor(private http: HttpClient) {

  }

  getCSRF() {
    return this.http.get<CSRFToken>(ApiUrl + '/csrf-token/')
  }


  login(email: string, password: string) {
    return this.http.post<JwTokenEncoded>(ApiUrl + '/login/', {email, password}).pipe(
      shareReplay()
    )
  }

  register(email: string, first_name: string, last_name: string, password: string) {
    return this.http.post<User>(ApiUrl + '/register/', {email, first_name, last_name, password}).pipe(
      shareReplay()
    )
  }


  setSession(jwt: JwTokenEncoded) {
    localStorage.setItem('jwt', JSON.stringify(jwt));
  }

  logout() {
    localStorage.removeItem("jwt");
  }

  public isLoggedIn() {
    return localStorage.getItem("jwt") != undefined;
  }


}
