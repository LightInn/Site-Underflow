import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthentificationService} from "../../../../services/authentification.service";
import {ToastService} from "../../../../services/toast.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ClassesService} from "../../../../services/callAPI/classes.service";

@Component({
  selector: 'app-update-classes',
  templateUrl: './update-classe.component.html',
  styleUrls: ['./update-classe.component.scss']
})
export class UpdateClasseComponent implements OnInit {
  // *************** Declaration part ******************* //
  form: FormGroup;
  classeId: string;

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
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
    });
    this.classeId = String(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.classesService.requestClasseSpecific(Number(this.classeId)).subscribe(
      response => {
        this.form.controls['title'].setValue(response.title);
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
          this.classesService.requestUpdateClasseSpecific(
            this.form.value.id,
            {
              id: this.form.value.id,
              title: this.form.value.title
            }
          ).subscribe(
            response => {
              this.toastService.newToast("Classe bien modifié", false);
            }, error => {
              this.toastService.newToast(error.error.error, true);
            }
          )
        }
      }
    }
  }
}
