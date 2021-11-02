import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../../../services/toast.service";
import {ActivatedRoute, Router} from "@angular/router";
import {regexMailCreated} from "../../../../constants/authorized.mail";

@Component({
  selector: 'app-forgot-mailto',
  templateUrl: './forgot-mailto.component.html',
  styleUrls: ['./forgot-mailto.component.scss']
})
export class ForgotMailtoComponent implements OnInit {
  // *************** Declaration part ******************* //
  form: FormGroup;

  /**
   * We declare all flag for errors (for profile)
   */
  error_email: boolean = false;
  error_flag: boolean = false;

  constructor(private fb: FormBuilder,
              private toastService: ToastService,
              private router: Router,
              private route: ActivatedRoute) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(regexMailCreated)]]
    });
  }

  ngOnInit(): void {
  }

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
