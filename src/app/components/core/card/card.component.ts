import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() id: number | null | undefined = 0;
  @Input() title: string | null | undefined = '';
  @Input() course_title: string | null | undefined = '';
  @Input() course_description: string | null | undefined = '';
  @Input() course_room: string | null | undefined = '';
  @Input() course_classe_title: string | null | undefined = '';
  @Input() course_date_start: string | null | undefined = '';
  @Input() routerLink_url: string | null | undefined = '';
  @Input() registrationMode: boolean | null | undefined = false;
  @Input() checked: boolean | null | undefined = false;
  @Output() outputclickEvent = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  clickOnRegistration(): void {
    if (!_.isEmpty(this.id) && !_.isNull(this.id)) {
      this.outputclickEvent.emit(this.id);
    }
  }
}
