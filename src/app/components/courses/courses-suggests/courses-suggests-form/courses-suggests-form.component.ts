import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "../../../../interfaces/subject";
import {Classe} from "../../../../interfaces/classe";
import {AuthentificationService} from "../../../../services/authentification.service";
import {ToastService} from "../../../../services/toast.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-courses-suggests-form',
  templateUrl: './courses-suggests-form.component.html',
  styleUrls: ['./courses-suggests-form.component.scss']
})
export class CoursesSuggestsFormComponent implements OnInit {
  subjectslist ?: Array<Subject>;
  classesList ?: Array<Classe>
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthentificationService,
              private toastService: ToastService,
              private router: Router) {
    this.form = this.fb.group({
      // todo validator personalized
      title: ['', [Validators.required]],
      date_butoir: ['', [Validators.required]],
      subjects: ['', [Validators.required]],
      classes: ['', [Validators.required]],
    });
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

  submit() {
    // todo submit
    console.log(this.form.status==="VALID")
    console.log(this.form.status==="INVALID")
    console.log(this.form.value)

    this.toastService.newToast("Envoie de la suggestion...", true)
    //  todo call api
  }
}
