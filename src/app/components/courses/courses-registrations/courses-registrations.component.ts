import { Component, OnInit } from '@angular/core';
import {IBase} from "../../../interfaces/base";

@Component({
  selector: 'app-courses-registrations',
  templateUrl: './courses-registrations.component.html',
  styleUrls: ['./courses-registrations.component.scss']
})
export class CoursesRegistrationsComponent implements OnInit {

  public base: IBase = {
    baseTitle: "Les cours",
    baseLandingMode: false,
    baseDescriptionFirstPart: "Trouve les cours disponibles,",
    baseDescriptionSecondPart: "choisis le mieux adapté à tes besoins et inscris-toi !",
    baseAdditionalCitation: false,
    baseAdditionalButton: true,
    basePath: "/courses-registrations",
    baseAssetPath: "./assets/images/svg/question.svg",
    baseAlt: "Proposition de cours",
    baseContent: "Proposer un cours",
    baseAlternative: false,
    baseAdditionnalSentence: "Tu ne trouves pas le cours que tu voulais ?",
    baseCitation:""
  }

  constructor() { }

  ngOnInit(): void {
  }

}
