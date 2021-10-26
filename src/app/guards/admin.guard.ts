import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthentificationService} from "../services/authentification.service";
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthentificationService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    let jwt: any = jwt_decode(<string>localStorage.getItem('jwt'));

    // return true;
    if (jwt.admin) {
      return true;
    } else {
      document.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
      return false;
    }
  }


}
