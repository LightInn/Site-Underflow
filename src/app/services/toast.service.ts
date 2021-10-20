import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {MessageToast} from "../interfaces/message-toast";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  // *************** Declaration part ******************* //
  private static message: MessageToast
  private behaviorSubject: BehaviorSubject<MessageToast>;

  constructor() {
    if (ToastService.message === undefined) {
      const message = new MessageToast()
      message.content = "Re Bonjour !"
      ToastService.message = message
    }
    this.behaviorSubject = new BehaviorSubject(ToastService.message);
  }

  public newToast(message: string, error: boolean) {

    if (message != "" && message != undefined) {

      ToastService.message.content = message;
      ToastService.message.error = error;
      ToastService.message.close = false;

      console.log(message);

      this.behaviorSubject.next(ToastService.message);
    } else {

      ToastService.message.content = "Erreur";
      ToastService.message.error = true;
      ToastService.message.close = false;

      this.behaviorSubject.next(ToastService.message);

    }

  }

  public getBehaviorSubject() {
    return this.behaviorSubject;
  }
}
