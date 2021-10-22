import {Component, Input, OnInit} from '@angular/core';
import {Subject} from "../../../../interfaces/subject";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-subjects',
  templateUrl: './admin-subjects.component.html',
  styleUrls: ['./admin-subjects.component.scss']
})
export class AdminSubjectsComponent implements OnInit {
  // *************** Declaration part ******************* //
  @Input() subjectsList: Array<Subject> | undefined;
  display: boolean = true;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if(!this.subjectsList){
      this.display = false;
    } else {
      this.display = true;
    }
  }

  change(subject: Subject) {
    this.router.navigateByUrl(`/admin/subject/${subject.id}`);
  }

  delete(subject: Subject) {
    // todo call api delete classes

  }
}
