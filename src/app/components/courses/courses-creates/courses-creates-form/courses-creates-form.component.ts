import { Component, OnInit } from '@angular/core';
import {Subject} from "../../../../interfaces/subject";
import {Classe} from "../../../../interfaces/classe";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-courses-creates-form',
  templateUrl: './courses-creates-form.component.html',
  styleUrls: ['./courses-creates-form.component.scss']
})
export class CoursesCreatesFormComponent implements OnInit {
  subjectslist ?: Array<Subject>;
  classesList ?: Array<Classe>

  form: FormGroup;

  submit() {
    // todo submit
    console.log(this.form.status==="VALID")
    console.log(this.form.status==="INVALID")
    console.log(this.form.value)
    //  todo call api
  }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      // todo validator personalized
      title: ['', [Validators.required]],
      date: ['', [Validators.required]],
      subjects: ['', [Validators.required]],
      classes: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.subjectslist = [
      {
        id:1,
        title:"premier"
      },
      {
        id:2,
        title:"deuxième"
      },
      {
        id:3,
        title:"troisième"
      }
    ]
    this.classesList = [
      {
        id:1,
        title:"premier"
      },
      {
        id:2,
        title:"deuxième"
      },
      {
        id:3,
        title:"troisième"
      }
    ]
  }

}
