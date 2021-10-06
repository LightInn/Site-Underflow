import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthentificationService} from "../services/authentification.service";
import {switchMap} from "rxjs/operators";


@Injectable()
export class AuthentificationInterceptor implements HttpInterceptor {

  private static CSRFTokenRun: boolean;
  private clonecsrf: any;
  private clonejwt: any;

  constructor(private authService: AuthentificationService) {


    if (AuthentificationInterceptor.CSRFTokenRun == null) {
      AuthentificationInterceptor.CSRFTokenRun = false;
    }


  }


  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {


    const idToken = localStorage.getItem("id_token");

    console.log("call service")

    if (AuthentificationInterceptor.CSRFTokenRun) {

      const clone = req.clone(
        {
          headers: req.headers.set("Authorization", "Bearer " + (idToken === null ? "" : idToken))

        }
      );

      AuthentificationInterceptor.CSRFTokenRun = false;


      return next.handle(clone);


    } else {

      AuthentificationInterceptor.CSRFTokenRun = true;
      return this.authService.getCSRF().pipe(switchMap(csrfToken => {

        AuthentificationService.csrfToken = csrfToken["X-CSRF-Token"]


        const clone = req.clone({
          headers: req.headers.set("X-CSRFToken", AuthentificationService.csrfToken)
            .set("Authorization", "Bearer " + (idToken === null ? "" : idToken))
        })

        return next.handle(clone);


      }));
    }

  }
}
