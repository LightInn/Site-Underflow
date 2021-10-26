import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {AuthentificationService} from "../services/authentification.service";
import {catchError, switchMap} from "rxjs/operators";
import {Router} from "@angular/router";
import {ToastService} from "../services/toast.service";


@Injectable()
export class AuthentificationInterceptor implements HttpInterceptor {
  // *************** Declaration part ******************* //
  private static CSRFTokenRun: boolean;

  constructor(private authService: AuthentificationService,
              private router: Router,
              private toastService: ToastService
  ) {
    if (AuthentificationInterceptor.CSRFTokenRun == null) {
      AuthentificationInterceptor.CSRFTokenRun = false;
    }
  }


  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401 || err.status === 403) {
      //navigate /delete cookies or whatever
      this.authService.logout();
      this.router.navigateByUrl(`/login`);
      this.toastService.newToast("Vous avez été deconecter", true)

      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of(err.message); // or EMPTY may be appropriate here
    }
    return throwError(err);
  }


  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    var idToken: any;
    if (!!localStorage.getItem("jwt")) {
      idToken = String(JSON.parse(String(localStorage.getItem("jwt"))).token)
    } else {
      idToken = localStorage.getItem("jwt")
    }

    let clone;
    console.log("call service")
    if (AuthentificationInterceptor.CSRFTokenRun) {
      if (idToken != null) {
        clone = req.clone(
          {
            headers: req.headers.set("Authorization", "Bearer " + idToken)
          }
        );
      } else {
        clone = req.clone();
      }
      AuthentificationInterceptor.CSRFTokenRun = false;
      return next.handle(clone).pipe(catchError(x => this.handleAuthError(x)));

    } else {
      AuthentificationInterceptor
        .CSRFTokenRun = true;
      return this.authService.getCSRF().pipe(switchMap(csrfToken => {
          AuthentificationService
            .csrfToken = csrfToken["X-CSRF-Token"]
          const
            clone = req.clone({
              headers: req.headers.set("X-CSRFToken", AuthentificationService.csrfToken)
                .set("Authorization", "Bearer " + (idToken === null ? "" : idToken))
            })
          return next.handle(clone).pipe(catchError(x => this.handleAuthError(x)));
        }
      ));
    }
  }
}
