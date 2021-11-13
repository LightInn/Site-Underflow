import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../../../services/toast.service";
import {ActivatedRoute, Router} from "@angular/router";
import {regexPassword} from "../../../../constants/regexValidators";
import {AuthentificationService} from "../../../../services/authentification.service";

@Component({
  selector: 'app-forgot-change-pass',
  templateUrl: './forgot-change-pass.component.html',
  styleUrls: ['./forgot-change-pass.component.scss']
})
export class ForgotChangePassComponent implements OnInit {
  // *************** Declaration part ******************* //
  form: FormGroup;
  password: string = '';

  /**
   * We declare all flag for errors (for profile)
   */
  error_token: boolean = false;
  error_password: boolean = false;
  error_password_valid: boolean = false;
  error_flag: boolean = false;

  constructor(private fb: FormBuilder,
              private toastService: ToastService,
              private authService: AuthentificationService,
              private router: Router,
              private route: ActivatedRoute) {
    this.form = this.fb.group({
      token: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(regexPassword)]],
      password_valid: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    let token = String(this.route.snapshot.paramMap.get('token'));
    this.form.controls['token'].setValue(token);
  }

  /**
   * Submit forgot password change , and trigger validators
   */
  submit() {
    // ********************* Reset Validators Flags ************************* //
    this.error_token = false;
    this.error_password = false;
    this.error_password_valid = false;
    this.error_flag = false;
    // Check the form controls
    for (const control in this.form.controls) {
      switch (control) {
        case 'token':
          if (!!this.form.controls[control].errors) {
            this.error_token = true;
          }
          break;
        case 'password':
          if (!!this.form.controls[control].errors) {
            this.error_password = true;
          }
          break;
        case 'password_valid':
          if (!!this.form.controls[control].errors) {
            this.error_password_valid = true;
          }
          break;
      }
    }

    if (!this.error_password_valid && !this.error_password) {
      if ((this.form.value.password !== this.form.value.password_valid)) {
        this.error_password = true;
        this.error_password_valid = true;
        this.error_flag = true;
      }
    }

    // Send error message to the toast service
    if (this.error_password ||
      this.error_password_valid ||
      this.error_token) {
      this.error_flag = true
      this.toastService.newToast("Erreur...", true)
    } else {
      this.error_flag = false
    }

    if (this.form.status === "VALID") {
      if (!this.error_flag) {
        this.authService.resetPassword(this.form.value.token, {
          password: this.form.value.password,
          confirm_password: this.form.value.password_valid
        }).subscribe(
          response => {
            this.toastService.newToast("Mot de passe bien modifié", false);
            this.router.navigateByUrl("/login")
          }, error => {
            this.toastService.newToast(error.error.status, true);
          }
        )
      }
    }
  }
}
