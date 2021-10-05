import {Component, OnInit} from '@angular/core';
import {IBase} from "../../../interfaces/base";

@Component({
  selector: 'app-courses-creates',
  templateUrl: './courses-creates.component.html',
  styleUrls: ['./courses-creates.component.scss']
})
export class CoursesCreatesComponent implements OnInit {
  public base: IBase = {
    baseTitle: "Donner un cours",
    baseLandingMode: false,
    baseDescriptionFirstPart: "Tu es à l’aise dans un domaine en particulier ?",
    baseDescriptionSecondPart: "Alors on a besoin de toi.",
    baseAdditionalCitation: false,
    baseAdditionalButton: false,
    basePath: "",
    baseAsset : false,
    baseAssetPath: "",
    baseAlt: "",
    baseContent: "",
    baseAlternative: false,
    baseAdditionnalSentence: "",
    baseCitation: ""
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
