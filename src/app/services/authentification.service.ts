import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as moment from "moment";

import {User} from "../interfaces/user";
import {shareReplay} from "rxjs/operators";
import {CSRFToken} from "../interfaces/csrfToken";
import {JwTokenEncoded} from "../interfaces/jw-token";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private expiresAt: moment.MomentInput;
  public static csrfToken: string;


  constructor(private http: HttpClient) {


  }

  getCSRF() {
    return this.http.get<CSRFToken>('http://127.0.0.1:5000/csrf-token/')
  }


  login(email: string, password: string) {
    return this.http.post<JwTokenEncoded>('http://127.0.0.1:5000/login/', {email, password}).pipe(
      shareReplay()
    )
  }

  register(email: string, firstname: string, lastname: string, password: string) {
    return this.http.post<User>('http://127.0.0.1:5000/register/', {email, firstname, lastname, password}).pipe(
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
