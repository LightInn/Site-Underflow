import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  status: boolean = false;

  public cours: any = [
    {
      id: 1,
      title: "",
      description: "",
      date_start: "",
      duration: "",
      ended: false,
      classe: {
        id: "",
        title: ""
      },
      subject: {},
      owner: {}
    }
  ]

  clickEvent() {
    this.status = !this.status;
    document.getElementById('nav')?.classList.toggle('underflow-fadeInvisible');
    document.getElementById('nav')?.classList.toggle('underflow-fadeVisible');
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
