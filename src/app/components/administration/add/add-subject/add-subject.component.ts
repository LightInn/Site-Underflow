import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../../../services/toast.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SubjectsService} from "../../../../services/callAPI/subjects.service";

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements OnInit {
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
              private subjectService: SubjectsService) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  /**
   * Submit function, we send all data on this function
   * and we trigger validators to the form
   */
  submit() {
    // ********************* Reset Validators Flags ************************* //
    this.error_title = false;
    this.error_flag = false;
    // Check the form controls
    for (const control in this.form.controls) {
      switch (control) {
        case 'title':
          if (!!this.form.controls[control].errors) {
            this.error_title = true;
          }
          break;
      }

      // Send error message to the toast service
      if (this.error_title) {
        this.error_flag = true
        this.toastService.newToast("Erreur...", true)
      } else {
        this.error_flag = false
      }

      if (this.form.status === "VALID") {
        if (!this.error_flag) {
          this.subjectService.addSubject(
            {
              title: this.form.value.title
            }
          ).subscribe(
            response => {
              this.router.navigate(['admin'])
              this.toastService.newToast("Sujet bien ajoutée", false);
            }, error => {
              this.toastService.newToast(error.error.error, true);
            }
          )
        }
      }
    }
  }
}
