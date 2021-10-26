import {Component, OnInit} from '@angular/core';
import {Base} from "../../interfaces/base";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  // *************** Declaration part ******************* //
  public base: Base = {
    baseTitle: "404 Не Найдено",
    baseLandingMode: false,
    baseDescriptionFirstPart: "Tu es perdu ?",
    baseDescriptionSecondPart: "",
    baseAdditionalCitation: false,
    baseAdditionalButton: true,
    basePath: "/",
    baseAsset: false,
    baseAssetPath: "",
    baseAlt: "Home",
    baseContent: "Accueil",
    baseAlternative: false,
    baseAdditionnalSentence: "",
    baseCitation: ""
  }

  constructor() {
  }

  ngOnInit(): void {
  }
}
