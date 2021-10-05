import {Component, Input, OnInit} from '@angular/core';
import {IBase} from '../../../interfaces/base'

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  // default conf
  @Input() base:IBase={
    baseTitle:"",
    baseCitation:"",
    baseLandingMode:false,
    baseAdditionalCitation:false,
    baseDescriptionFirstPart:"",
    baseDescriptionSecondPart:"",
    baseAdditionalButton:false,
    baseAdditionnalSentence:"",
    basePath:"",
    baseAssetPath:"",
    baseAlt:"",
    baseContent:"",
    baseAlternative:false,
  };

  constructor() {

  }

  ngOnInit(): void {

  }


}
