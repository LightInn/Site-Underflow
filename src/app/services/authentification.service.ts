import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as moment from "moment";

import {User} from "../interfaces/user";
import {shareReplay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private expiresAt: moment.MomentInput;


  constructor(private http: HttpClient) {

  }

  login(email: string, password: string) {
    return this.http.post<User>('/api/login', {email, password}).pipe(
      shareReplay()
    )
  }

  register(email: string, firstname: string, lastname: string, password: string) {
    return this.http.post<User>('/api/register', {email, firstname, lastname, password})
  }


  private setSession(authResult: { expiresIn: any; idToken: string; }) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");

    if (expiration != null) {
      this.expiresAt = JSON.parse(expiration);
    }
    return moment(this.expiresAt);
  }
}
