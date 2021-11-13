import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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

  /**
   * We init the data, get a specific classe :D
   */
  ngOnInit(): void {
    this.classesService.requestClasseSpecific(Number(this.classeId)).subscribe(
      response => {
        if (response.length) {
          this.form.controls['title'].setValue(response[0].title);
        } else {
          this.router.navigate(['not-found'])
        }
      }, error => {
        this.toastService.newToast(error.error.status, true);
        this.router.navigate(['not-found'])
      }
    )
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
          this.classesService.requestUpdateClasseSpecific(
            {
              id: this.form.value.id,
              title: this.form.value.title
            }
          ).subscribe(
            response => {
              this.router.navigate(['admin'])
              this.toastService.newToast("Classe bien modifié", false);
            }, error => {
              this.toastService.newToast(error.error.status, true);
            }
          )
        }
      }
    }
  }
}
