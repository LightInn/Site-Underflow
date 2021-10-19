import {Component, Input, OnInit} from '@angular/core';
import {Subject} from "../../../../interfaces/subject";

@Component({
  selector: 'app-admin-subjects',
  templateUrl: './admin-subjects.component.html',
  styleUrls: ['./admin-subjects.component.scss']
})
export class AdminSubjectsComponent implements OnInit {
  @Input() subjectsList : Array<Subject> | undefined ;
  display: boolean = true;

  constructor() {
  }

  ngOnInit(): void {

  }

  change(subject:Subject){

  }

  delete(subject:Subject){

  }
}
