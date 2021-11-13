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
