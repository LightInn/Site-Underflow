import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  @Input() title?: string;
  @Input() citation?: string;
  @Input() landingMode?: boolean;
  @Input() additionalCitation?: boolean;
  @Input() descriptionFirstPart?: string;
  @Input() descriptionSecondPart?: string;
  @Input() additionalButton?: boolean;
  @Input() additionnalSentence?: string;
  @Input() path?: string;
  @Input() assetPath?: string;
  @Input() alt?: string;
  @Input() content?: string;
  @Input() alternative?: boolean;

  constructor() {

  }

  ngOnInit(): void {

  }


}
