import { Component, OnInit } from '@angular/core';
import {Base} from "../../interfaces/base";

@Component({
  selector: 'app-rgpd',
  templateUrl: './rgpd.component.html',
  styleUrls: ['./rgpd.component.scss']
})
export class RGPDComponent implements OnInit {
  public base: Base = {
    baseTitle: "RGPD",
    baseLandingMode: false,
    baseDescriptionFirstPart: "RGPD Proof !",
    baseDescriptionSecondPart: "",
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
