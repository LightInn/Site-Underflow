import { Component, OnInit } from '@angular/core';
import {IBase} from "../../../interfaces/base";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public base: IBase = {
    baseTitle: "Mon profil",
    baseLandingMode: false,
    baseDescriptionFirstPart: "C'est ici que tu remplis ton profil !",
    baseDescriptionSecondPart: "",
    baseAdditionalCitation: false,
    baseAdditionalButton: false,
    basePath: "",
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
