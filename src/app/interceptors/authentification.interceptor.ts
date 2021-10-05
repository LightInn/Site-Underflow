import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthentificationService} from "../services/authentification.service";

@Injectable()
export class AuthentificationInterceptor implements HttpInterceptor {

  constructor() {
  }


  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = localStorage.getItem("id_token");
    if (AuthentificationService.csrfToken != null) {
      req.headers.set("X-CSRFToken", AuthentificationService.csrfToken)
    }


    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization",
          "Bearer " + idToken)
      });


      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }


}
