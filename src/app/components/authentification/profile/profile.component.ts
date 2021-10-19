import { Component, OnInit } from '@angular/core';
import {Base} from "../../../interfaces/base";
import {AuthentificationService} from "../../../services/authentification.service";
import {ToastService} from "../../../services/toast.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public base: Base = {
    baseTitle: "Mon profil",
    baseLandingMode: false,
    baseDescriptionFirstPart: "C'est ici que tu remplis ton profil !",
    baseDescriptionSecondPart: "",
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

  constructor(
    private authService: AuthentificationService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}
