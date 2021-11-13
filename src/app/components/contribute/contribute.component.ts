import { Component, OnInit } from '@angular/core';
import {Base} from "../../interfaces/base";

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.scss']
})
export class ContributeComponent implements OnInit {
  public base: Base = {
    baseTitle: "Changelog - v1.0",
    baseLandingMode: false,
    baseDescriptionFirstPart: "Vous souhaitez contribuer ?",
    baseDescriptionSecondPart: "C'est très gentil ça ♥ !",
    baseAdditionalCitation: false,
    baseAdditionalButton: false,
    basePath: "",
    baseAsset: false,
    baseAssetPath: "",
    baseAlt: "",
    baseContent: "",
    baseAlternative: false,
    baseAdditionnalSentence: "",
    baseCitation: ""
  }

  constructor() { }

  ngOnInit(): void {
  }

}
