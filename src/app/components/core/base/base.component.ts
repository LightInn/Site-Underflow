import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  @Input() title?:string;

  constructor() {

  }

  ngOnInit(): void {

  }


}
