import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../../../services/toast.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SubjectsService} from "../../../../services/callAPI/subjects.service";

@Component({
  selector: 'app-update-subject',
  templateUrl: './update-subject.component.html',
  styleUrls: ['./update-subject.component.scss']
})
export class UpdateSubjectComponent implements OnInit {
  // *************** Declaration part ******************* //
  form: FormGroup;
  subjectId: string;

  /**
   * We declare all flag for errors (for profile)
   */
  error_title: boolean = false;
  error_flag: boolean = false;

  constructor(private fb: FormBuilder,
              private toastService: ToastService,
              private router: Router,
              private route: ActivatedRoute,
              private subjectsService: SubjectsService) {
    this.form = this.fb.group({
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
    });
    this.subjectId = String(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.subjectsService.requestSubjectSpecific(Number(this.subjectId)).subscribe(
      response => {
        if (response.length) {
          this.form.controls['title'].setValue(response[0].title);
        } else {
          this.toastService.newToast("La matière n'existe pas !", true);
          this.router.navigate(['not-found'])
        }
      }, error => {
        this.toastService.newToast(error.error.error, true);
      }
    )
  }

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
          this.subjectsService.requestUpdateSubjectSpecific(
            this.form.value.id,
            {
              id: this.form.value.id,
              title: this.form.value.title
            }
          ).subscribe(
            response => {
              this.toastService.newToast("Matière bien modifié", false);
            }, error => {
              this.toastService.newToast(error.error.error, true);
            }
          )
        }
      }
    }
  }
}
