import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Classe} from "../../../../interfaces/classe";
import {AuthentificationService} from "../../../../services/authentification.service";
import {ToastService} from "../../../../services/toast.service";
import {Router} from "@angular/router";
import {regexMailCreated} from "../../../../constants/authorized.mail"

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
  password: string = '';

  /**
   * We declare all flag for errors (for profile)
   */
  error_firstname: boolean = false;
  error_lastname: boolean = false;
  error_classes: boolean = false;
  error_email: boolean = false;
  error_flag: boolean = false;

  /**
   * We declare all flag for errors (for passwords)
   */
  error_old_password: boolean = false;
  error_password: boolean = false;
  error_password_valid: boolean = false;
  error_flag_password: boolean = false;

  /**
   * The constructor, take differents parameters, it's automatic in angular,
   * we use differents values with it
   * @param fb -> to create our form, and initialize Validators
   * @param authService -> to use the auth service
   * @param toastService -> to display messages with popup service
   * @param router -> to swap on another page on submit
   */
  constructor(private fb: FormBuilder,
              private authService: AuthentificationService,
              private toastService: ToastService,
              private router: Router) {
    // ************** Initialization ******************** //
    this.form = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      classes: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(regexMailCreated)]]
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
    this.error_flag = false;
    // Check the form controls
    for (const control in this.form.controls) {
      switch (control) {
        case 'firstname':
          if (!!this.form.controls[control].errors) {
            this.error_firstname = true;
            this.error_flag = true;
          } else {
            this.error_firstname = false;
          }

          break;
        case 'lastname':
          if (!!this.form.controls[control].errors) {
            this.error_lastname = true;
            this.error_flag = true;
          } else {
            this.error_lastname = false;
          }
          break;
        case 'classes':
          if (!!this.form.controls[control].errors) {
            this.error_classes = true;
            this.error_flag = true;
          } else {
            this.error_classes = false;
          }
          break;
        case 'email':
          if (!!this.form.controls[control].errors) {
            this.error_email = true;
            this.error_flag = true;
          } else {
            this.error_email = false;
          }
          break;
      }
    }
    // Send error message to the toast service
    this.error_flag ? this.toastService.newToast("Erreur...", true) : this.toastService.newToast("Profil modifié...", false);

    //  todo call api
  }

  submitPassword() {
    // todo submit
    console.log(this.formPassword.status === "VALID")
    console.log(this.formPassword.status === "INVALID")
    console.log(this.formPassword.value)
    this.error_flag_password = false;
    // Check the form controls
    for (const control in this.formPassword.controls) {
      switch (control) {
        case 'old_password':
          if (!!this.formPassword.controls[control].errors) {
            this.error_old_password = true;
            this.error_flag_password = true;
          } else {
            this.error_old_password = false;
          }
          break;
        case 'password':
          if (!!this.formPassword.controls[control].errors) {
            this.error_password = true;
            this.error_flag_password = true;
          } else {
            this.error_password = false;
          }
          break;
        case 'password_valid':
          if (!!this.formPassword.controls[control].errors) {
            this.error_password_valid = true;
            this.error_flag_password = true;
          } else {
            this.error_password_valid = false;
          }
          break;
      }
    }
    if (!this.error_password_valid && !this.error_password) {
      if ((this.formPassword.value.password !== this.formPassword.value.password_valid)) {
        this.error_password = true;
        this.error_password_valid = true;
        this.error_flag_password = true;
      }
    }
    // Send error message to the toast service
    this.error_flag_password ? this.toastService.newToast("Erreur...", true) : this.toastService.newToast("Mot de passe modifié...", false);

    //  todo call api
  }
}
