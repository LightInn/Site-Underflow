import {Component} from '@angular/core';
import {IBase} from "./interfaces/base"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // conf Ibase
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
  title = 'scratchunderflow';

}
