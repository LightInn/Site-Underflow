import {Component, OnInit} from '@angular/core';
import {Base} from "../../../interfaces/base";

@Component({
  selector: 'app-files-download',
  templateUrl: './files-download.component.html',
  styleUrls: ['./files-download.component.scss']
})
export class FilesDownloadComponent implements OnInit {
  // *************** Declaration part ******************* //
  public base: Base = {
    baseTitle: "Les fiches, [Work in progress]",
    baseLandingMode: false,
    baseDescriptionFirstPart: "Tu veux trouver une documentation ? Un tuto ?",
    baseDescriptionSecondPart: "C'est ici que ça se passe !",
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

  constructor() {
  }

  ngOnInit(): void {
  }
}
