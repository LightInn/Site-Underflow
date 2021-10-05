import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {templateJitUrl} from "@angular/compiler";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private static message: string
  private behaviorSubject: BehaviorSubject<string>;

  constructor() {

    if (ToastService.message === null) {
      ToastService.message = "Bienvenue"
    }
    this.behaviorSubject = new BehaviorSubject(ToastService.message);

  }


  public newToast(message: string,) {
    ToastService.message = message;
    this.behaviorSubject.next(ToastService.message);
  }


  public getBehaviorSubject() {
    return this.behaviorSubject;
  }


}
