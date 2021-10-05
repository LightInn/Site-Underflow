import {Component, OnInit} from '@angular/core';
import {ToastService} from 'src/app/services/toast.service';
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {


  constructor(private toastService: ToastService) {


  }

  private message: any
  private toast: BehaviorSubject<string> | undefined;


  ngOnInit(): void {

    this.toast = this.toastService.getBehaviorSubject();

    this.toast.subscribe(
      message => this.message = message
    )


  }


}
