import { Component, OnInit } from '@angular/core';
import {Subject} from "../../../../interfaces/subject";
import {Classe} from "../../../../interfaces/classe";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthentificationService} from "../../../../services/authentification.service";
import {ToastService} from "../../../../services/toast.service";
import {Router} from "@angular/router";

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

    this.toastService.newToast("Création de cours...", true)
    //  todo call api
  }

  constructor(private fb: FormBuilder,
              private authService: AuthentificationService,
              private toastService: ToastService,
              private router: Router) {
    this.form = this.fb.group({
      // todo validator personalized
      title: ['', [Validators.required]],
      date: ['', [Validators.required]],
      subjects: ['', [Validators.required]],
      classes: ['', [Validators.required]],
      description:['',[Validators.required]]
    });
  }

  ngOnInit(): void {
    this.subjectslist = [
      {
        id:1,
        title:"premier matière"
      },
      {
        id:2,
        title:"deuxième matière"
      },
      {
        id:3,
        title:"troisième matière"
      }
    ]
    this.classesList = [
      {
        id:1,
        title:"B1"
      },
      {
        id:2,
        title:"B2"
      },
      {
        id:3,
        title:"B3"
      }
    ]
  }

}
