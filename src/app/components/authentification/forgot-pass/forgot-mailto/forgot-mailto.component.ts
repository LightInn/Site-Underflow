import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../../../services/toast.service";
import {ActivatedRoute, Router} from "@angular/router";
import {regexMailCreated} from "../../../../constants/authorized.mail";
import {AuthentificationService} from "../../../../services/authentification.service";

@Component({
  selector: 'app-forgot-mailto',
  templateUrl: './forgot-mailto.component.html',
  styleUrls: ['./forgot-mailto.component.scss']
})
export class ForgotMailtoComponent implements OnInit {
  // *************** Declaration part ******************* //
  form: FormGroup;
  disableButton: boolean = false;

  /**
   * We declare all flag for errors (for profile)
   */
  error_email: boolean = false;
  error_flag: boolean = false;

  constructor(private fb: FormBuilder,
              private toastService: ToastService,
              private authService: AuthentificationService,
              private router: Router,
              private route: ActivatedRoute) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(regexMailCreated)]]
    });
  }

  ngOnInit(): void {
  }

  /**
   * Submit mail to send reset password link
   */
  submit() {
    // ********************* Reset Validators Flags ************************* //
    this.error_email = false;
    this.error_flag = false;
    // Check the form controls
    for (const control in this.form.controls) {
      switch (control) {
        case 'email':
          if (!!this.form.controls[control].errors) {
            this.error_email = true;
          }
          break;
      }

      // Send error message to the toast service
      if (this.error_email) {
        this.error_flag = true
        this.toastService.newToast("Erreur...", true)
      } else {
        this.error_flag = false
      }

      if (this.form.status === "VALID") {
        if (!this.error_flag) {
          this.authService.resetPasswordMailTo({email: this.form.value.email}).subscribe(
            response => {
              this.disableButton = true;
              this.toastService.newToast("Email bien envoyé !", false);
            }, error => {
              this.toastService.newToast(error.error.error, true);
            }
          )
        }
      }
    }
  }

  /**
   * Redirect on login page
   */
  goLogin() {
    this.router.navigateByUrl("/login")
  }
}
