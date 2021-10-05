import { Component, OnInit } from '@angular/core';
import {IBase} from "../../interfaces/base";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  public base: IBase = {
    baseTitle: "404 not found",
    baseLandingMode: false,
    baseDescriptionFirstPart: "Tu es perdu ?",
    baseDescriptionSecondPart: "",
    baseAdditionalCitation: false,
    baseAdditionalButton: true,
    basePath: "/landing",
    baseAsset : false,
    baseAssetPath: "",
    baseAlt: "Home",
    baseContent: "Accueil",
    baseAlternative: false,
    baseAdditionnalSentence: "",
    baseCitation:""
  }

  constructor() { }

  ngOnInit(): void {
  }

}
