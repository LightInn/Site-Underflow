import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "../../../../interfaces/subject";

@Component({
  selector: 'app-courses-suggests-form',
  templateUrl: './courses-suggests-form.component.html',
  styleUrls: ['./courses-suggests-form.component.scss']
})
export class CoursesSuggestsFormComponent implements OnInit {
  form: FormGroup;

  subjectslist = [
    {

      title:"premiere matière"
    },
    {

      title:"deuxième matière"
    },
    {

      title:"troisième matière"
    },
  ]

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  submit() {
    // todo submit
  }

  ngOnInit(): void {

  }

}
