import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../../../services/toast.service";
import {ActivatedRoute, Router} from "@angular/router";
import {regexMailCreated} from "../../../../constants/authorized.mail";
import {regexPassword} from "../../../../constants/regexValidators";

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
  error_password: boolean = false;
  error_password_valid: boolean = false;
  error_flag: boolean = false;

  constructor(private fb: FormBuilder,
              private toastService: ToastService,
              private router: Router,
              private route: ActivatedRoute) {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(7), Validators.pattern(regexPassword)]],
      password_valid: ['', [Validators.required, Validators.minLength(7), Validators.pattern(regexPassword)]],
    });
  }

  ngOnInit(): void {
  }

  /**
   * Submit forgot password change , and trigger validators
   */
  submit() {
    // ********************* Reset Validators Flags ************************* //
    this.error_password = false;
    this.error_password_valid = false;
    this.error_flag = false;
    // Check the form controls
    for (const control in this.form.controls) {
      switch (control) {
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

      if (!this.error_password_valid && !this.error_password) {
        if ((this.form.value.password !== this.form.value.password_valid)) {
          this.error_password = true;
          this.error_password_valid = true;
          this.error_flag = true;
        }
      }

      // Send error message to the toast service
      if (this.error_password ||
        this.error_password_valid) {
        this.error_flag = true
        this.toastService.newToast("Erreur...", true)
      } else {
        this.error_flag = false
      }

      if (this.form.status === "VALID") {
        if (!this.error_flag) {
          // this.classesService.requestAddClasse(
          //   {
          //     title: this.form.value.title
          //   }
          // ).subscribe(
          //   response => {
          //     this.router.navigate(['admin'])
          //     this.toastService.newToast("Classe bien ajoutée", false);
          //   }, error => {
          //     this.toastService.newToast(error.error.error, true);
          //   }
          // )
        }
      }
    }
  }
}
