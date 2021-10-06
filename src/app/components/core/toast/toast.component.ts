import {Component, OnInit} from '@angular/core';
import {ToastService} from 'src/app/services/toast.service';
import {MessageToast} from "../../../interfaces/message-toast";


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {


  public message: MessageToast = new MessageToast();


  constructor(private toastService: ToastService) {

  }


  ngOnInit(): void {


    this.toastService.getBehaviorSubject().subscribe(
      message => this.message = message
    )
  }


  closeMessage(): void {
    if (this.message) {
      this.message.close = true;
    }
  }


}

