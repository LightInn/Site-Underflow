import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "../../../../interfaces/subject";
import {Classe} from "../../../../interfaces/classe";

@Component({
  selector: 'app-courses-suggests-form',
  templateUrl: './courses-suggests-form.component.html',
  styleUrls: ['./courses-suggests-form.component.scss']
})
export class CoursesSuggestsFormComponent implements OnInit {
  subjectslist ?: Array<Subject>;
  classesList ?: Array<Classe>

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      // todo validator personalized
      title: ['', [Validators.required]],
      date_butoir: ['', [Validators.required]],
      subjects: ['', [Validators.required]],
      classes: ['', [Validators.required]],
    });
  }

  submit() {
    // todo submit
    console.log(this.form.status==="VALID")
    console.log(this.form.status==="INVALID")
    console.log(this.form.value)
    //  todo call api
  }

  ngOnInit(): void {
    this.subjectslist = [
      {
        id: 1,
        title: "premiere matière"
      },
      {
        id: 2,
        title: "deuxième matière"
      },
      {
        id: 3,
        title: "troisième matière"
      },
    ]
    this.classesList = [
      {
        id: 1,
        title: "B1"
      },
      {
        id: 2,
        title: "B2"
      },
      {
        id: 3,
        title: "B3"
      }
    ]
  }
}
