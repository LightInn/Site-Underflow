import { Component, OnInit } from '@angular/core';
import {Base} from "../../../interfaces/base";

@Component({
  selector: 'app-files-creates',
  templateUrl: './files-creates.component.html',
  styleUrls: ['./files-creates.component.scss']
})
export class FilesCreatesComponent implements OnInit {
  public base: Base = {
    baseTitle: "Créer une fiche [Work in progress]",
    baseLandingMode: false,
    baseDescriptionFirstPart: "Tu veux partager tes connaissances ?",
    baseDescriptionSecondPart: "C'est ici que ça se passe !",
    baseAdditionalCitation: false,
    baseAdditionalButton: false,
    basePath: "",
    baseAsset:false,
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
