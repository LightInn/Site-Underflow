import {Component, Input, OnInit} from '@angular/core';
import {Base} from '../../../interfaces/base'

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  // default conf
  @Input() base:Base={
    baseTitle:"",
    baseCitation:"",
    baseLandingMode:false,
    baseAdditionalCitation:false,
    baseDescriptionFirstPart:"",
    baseDescriptionSecondPart:"",
    baseAdditionalButton:false,
    baseAdditionnalSentence:"",
    basePath:"",
    baseAsset:false,
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
