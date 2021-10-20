import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Classe} from "../../../../interfaces/classe";
import {AuthentificationService} from "../../../../services/authentification.service";
import {ToastService} from "../../../../services/toast.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {
  // *************** Declaration part ******************* //
  classesList: Array<Classe> = [];
  form: FormGroup;
  formPassword: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthentificationService,
              private toastService: ToastService,
              private router: Router) {
    this.form = this.fb.group({
      // todo validator personalized
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      classes: ['', [Validators.required]],
      email: ['', [Validators.required]]
    });
    this.formPassword = this.fb.group({
      old_password: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password_valid: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
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
    console.log(this.form.status === "VALID")
    console.log(this.form.status === "INVALID")
    console.log(this.form.value)
    //  todo call api
  }

  submitPassword() {
    // todo submit
    console.log(this.form.status === "VALID")
    console.log(this.form.status === "INVALID")
    console.log(this.form.value)
    //  todo call api
  }
}
