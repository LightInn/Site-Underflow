import { Component, OnInit } from '@angular/core';
import {Base} from "../../interfaces/base";

@Component({
  selector: 'app-legal-mentions',
  templateUrl: './legal-mentions.component.html',
  styleUrls: ['./legal-mentions.component.scss']
})
export class LegalMentionsComponent implements OnInit {
  public base: Base = {
    baseTitle: "Règlement",
    baseLandingMode: false,
    baseDescriptionFirstPart: "Ici c'est la partie légale !",
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
