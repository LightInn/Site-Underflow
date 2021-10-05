import { Component, OnInit } from '@angular/core';
import {IBase} from "../../../interfaces/base";

@Component({
  selector: 'app-courses-suggests',
  templateUrl: './courses-suggests.component.html',
  styleUrls: ['./courses-suggests.component.scss']
})
export class CoursesSuggestsComponent implements OnInit {
  public base: IBase = {
    baseTitle:"Suggérer un cours",
    baseLandingMode:false,
    baseDescriptionFirstPart:"Tu as besoin d'aide dans une matière ?",
    baseDescriptionSecondPart:"Fais ta demande ici !",
    baseAdditionalCitation:false,
    baseAdditionalButton:false,
    basePath:"",
    baseAsset : false,
    baseAssetPath:"",
    baseAlt:"",
    baseContent:"",
    baseAlternative:false,
    baseAdditionnalSentence:"",
    baseCitation:""
  }

  constructor() { }

  ngOnInit(): void {
  }

}
