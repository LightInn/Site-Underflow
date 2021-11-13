import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthentificationService} from "../services/authentification.service";
import {CoursesService} from '../services/callAPI/courses.service';
import {ToastService} from "../services/toast.service";

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {


  constructor(private authService: AuthentificationService,
              private router: Router,
              private coursesService: CoursesService,
              private toastService: ToastService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;

// si c'est l'utilisateur qui a creer le cours de la route
    let id_course = route.params.id


    return this.coursesService.requestCoursesCreated().toPromise().then(
      courses => {
        for (let course of courses) {
          if (id_course == course.id) {
            return true;
          }
        }
        this.router.navigateByUrl("/404 Не Найдено");
        return false;
      },
      error => {
        this.toastService.newToast(error.error.status, true);
        this.router.navigateByUrl("/404 Не Найдено");
        return false;
      }
    );


  }
}
