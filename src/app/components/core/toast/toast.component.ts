import {Component, OnInit} from '@angular/core';
import {ToastService} from 'src/app/services/toast.service';
import {MessageToast} from "../../../interfaces/message-toast";
import {animate, state, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
        transform: 'translateX(0px)'
      })),
      state('closed', style({
        opacity: 0,
        transform: 'translateX(800px)'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class ToastComponent implements OnInit {


  public message: MessageToast = new MessageToast();

  constructor(private toastService: ToastService) {

  }

  ngOnInit(): void {


    this.toastService.getBehaviorSubject().subscribe(
      message => {
        this.message = message

        setTimeout(function (this: any) {
          message.close = true
        }, 6000)
      })
  }


  closeMessage(): void {
    if (this.message) {
      this.message.close = true;
    }
  }


}

