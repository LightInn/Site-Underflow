import {Message} from "@angular/compiler/src/i18n/i18n_ast";

export interface MessageToast {
  content: string;
  error: boolean;
  close : boolean;
}

export class MessageToast implements MessageToast {
  content: string = "";
  error: boolean = false;
  close: boolean = false;
}
