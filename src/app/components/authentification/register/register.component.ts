import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthentificationService} from "../../../services/authentification.service";
import {Router} from "@angular/router";
import {regexMailCreated} from "../../../constants/authorized.mail";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  // *************** Declaration part ******************* //
  inputvalue = "";
  form: FormGroup;

  /**
   * We declare all flag for errors (for profile)
   */
  error_email: boolean = false;
  error_firstname: boolean = false;
  error_lastname: boolean = false;
  error_password: boolean = false;
  error_flag: boolean = false;

  constructor(private fb: FormBuilder,
              private authService: AuthentificationService,
              private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(regexMailCreated)]],
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\u00C0-\u017F\-\s]+/g)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\u00C0-\u017F\-\s]+/g)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)]]
    });
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  register() {
    this.error_flag = false;
    // Check the form controls
    for (const control in this.form.controls) {
      switch (control) {
        case 'email':
          if (!!this.form.controls[control].errors) {
            this.error_email = true;
            this.error_flag = true;
          } else {
            this.error_flag = false;
          }
          break;
        case 'firstname':
          if (!!this.form.controls[control].errors) {
            this.error_firstname = true;
            this.error_flag = true;
          } else {
            this.error_flag = false;
          }
          break;
        case 'lastname':
          if (!!this.form.controls[control].errors) {
            this.error_lastname = true;
            this.error_flag = true;
          } else {
            this.error_flag = false;
          }
          break;
        case 'password':
          if (!!this.form.controls[control].errors) {
            this.error_password = true;
            this.error_flag = true;
          } else {
            this.error_flag = false;
          }
          break;
      }
    }

    if (!this.error_flag) {
      const val = this.form.value;
      if (val.email && val.password && val.firstname && val.lastname) {
        this.authService.register(val.email, val.firstname, val.lastname, val.password)
          .subscribe(
            () => {
              this.router.navigateByUrl('/');
            }
          );
      }
    }
  }
}
