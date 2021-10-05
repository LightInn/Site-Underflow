import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button-routeur',
  templateUrl: './button-routeur.component.html',
  styleUrls: ['./button-routeur.component.scss']
})
export class ButtonRouteurComponent implements OnInit {

  @Input() path?: string;
  @Input() assetPath?: string;
  @Input() alternative?: boolean;
  @Input() alt?: string;
  @Input() content?: string;

  constructor() {
  }

  ngOnInit(): void {

  }

}
