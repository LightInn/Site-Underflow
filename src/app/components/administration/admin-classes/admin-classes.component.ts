import {Component, Input, OnInit} from '@angular/core';
import {Classe} from "../../../interfaces/classe";

@Component({
  selector: 'app-admin-classes',
  templateUrl: './admin-classes.component.html',
  styleUrls: ['./admin-classes.component.scss']
})
export class AdminClassesComponent implements OnInit {
  @Input() classesList : Array<Classe> | undefined;
  display : boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
