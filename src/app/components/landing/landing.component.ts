import {Component, OnInit} from '@angular/core';
import {Base} from "../../interfaces/base";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  // *************** Declaration part ******************* //
  public base: Base = {
    baseTitle: "Tutorat et Entraide",
    baseLandingMode: true,
    baseDescriptionFirstPart: "",
    baseDescriptionSecondPart: "",
    baseAdditionalCitation: true,
    baseCitation: "Enseigner, c'est apprendre deux fois.",
    baseAdditionalButton: false,
    basePath: "",
    baseAsset: false,
    baseAssetPath: "",
    baseAlt: "",
    baseContent: "",
    baseAlternative: false,
    baseAdditionnalSentence: "Tu ne trouves pas le cours que tu voulais ?",
  }

  constructor() {
  }

  ngOnInit(): void {
  }
}
