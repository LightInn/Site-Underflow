import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthentificationService} from "../../../services/authentification.service";
import {Router} from "@angular/router";
import {regexMailCreated} from "../../../constants/authorized.mail";
import {regexName, regexPassword} from "../../../constants/regexValidators";
import {ToastService} from "../../../services/toast.service";

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
              private router: Router,
              private toastService: ToastService,) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(regexMailCreated)]],
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.pattern(regexName)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.pattern(regexName)]],
      password: ['', [Validators.required, Validators.minLength(7), Validators.pattern(regexPassword)]]
    });
  }

  /**
   * redirect to login page
   */
  login() {
    this.router.navigateByUrl('/login');
  }

  /**
   * Trigger validators and register on API
   */
  register() {
    // ********************* Reset Validators Flags ************************* //
    this.error_email = false;
    this.error_firstname = false;
    this.error_lastname = false;
    this.error_password = false;
    this.error_flag = false;
    // Check the form controls
    for (const control in this.form.controls) {
      switch (control) {
        case 'email':
          if (!!this.form.controls[control].errors) {
            this.error_email = true;
          }
          break;
        case 'firstname':
          if (!!this.form.controls[control].errors) {
            this.error_firstname = true;
          }
          break;
        case 'lastname':
          if (!!this.form.controls[control].errors) {
            this.error_lastname = true;
          }
          break;
        case 'password':
          if (!!this.form.controls[control].errors) {
            this.error_password = true;
          }
          break;
      }
    }

    // Send error message to the toast service
    if (this.error_email ||
      this.error_firstname ||
      this.error_lastname ||
      this.error_password) {
      this.error_flag = true
      this.toastService.newToast("Erreur...", true)
    } else {
      this.error_flag = false
    }

    if (this.form.status === "VALID") {
      if (!this.error_flag) {
        const val = this.form.value;
        if (val.email && val.password && val.firstname && val.lastname) {
          this.authService.register(val.email, val.firstname, val.lastname, val.password)
            .subscribe(
              () => {
                this.authService.requestConfirmation({email: val.email}).subscribe(
                  () => {
                    this.toastService.newToast('Lien de confirmation envoyé par email !', false)
                  }
                )
                this.router.navigate(['/confirmation'], {state: {email: val.email}});
              }
            );
        }
      }
    }
  }
}
