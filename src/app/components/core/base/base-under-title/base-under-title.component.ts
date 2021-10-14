import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-base-under-title',
  templateUrl: './base-under-title.component.html',
  styleUrls: ['./base-under-title.component.scss']
})
export class BaseUnderTitleComponent implements OnInit {

  @Input() landingMode?: boolean;
  @Input() descriptionFirstPart?: string;
  @Input() descriptionSecondPart?: string;

  constructor() {

  }

  ngOnInit(): void {

  }

}
