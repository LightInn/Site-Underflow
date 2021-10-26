import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../../../services/toast.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ClassesService} from "../../../../services/callAPI/classes.service";

@Component({
  selector: 'app-add-classe',
  templateUrl: './add-classe.component.html',
  styleUrls: ['./add-classe.component.scss']
})
export class AddClasseComponent implements OnInit {
  // *************** Declaration part ******************* //
  form: FormGroup;

  /**
   * We declare all flag for errors (for profile)
   */
  error_title: boolean = false;
  error_flag: boolean = false;

  constructor(private fb: FormBuilder,
              private toastService: ToastService,
              private router: Router,
              private route: ActivatedRoute,
              private classesService: ClassesService) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  submit() {
    this.error_flag = false;
    // Check the form controls
    for (const control in this.form.controls) {
      switch (control) {
        case 'title':
          if (!!this.form.controls[control].errors) {
            this.error_title = true;
            this.error_flag = true;
          } else {
            this.error_flag = false;
          }
          break;
      }
      // Send error message to the toast service
      if (this.error_flag) {
        this.toastService.newToast("Erreur...", true)
      }

      if (this.form.status === "VALID") {
        if (!this.error_flag) {
          this.classesService.requestAddClasse(
            {
              title: this.form.value.title
            }
          ).subscribe(
            response => {
              this.router.navigate(['admin'])
              this.toastService.newToast("Classe bien ajoutée", false);
            }, error => {
              this.toastService.newToast(error.error.error, true);
            }
          )
        }
      }
    }
  }
}
