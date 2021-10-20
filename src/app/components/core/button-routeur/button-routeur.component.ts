import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button-routeur',
  templateUrl: './button-routeur.component.html',
  styleUrls: ['./button-routeur.component.scss']
})
export class ButtonRouteurComponent implements OnInit {
  // *************** Declaration part ******************* //
  @Input() path?: string;
  @Input() assetPath?: string;
  @Input() alternative?: boolean;
  @Input() alt?: string;
  @Input() content?: string;
  @Input() asset?: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }
}
