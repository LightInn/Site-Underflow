import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthentificationService} from "../../../../services/authentification.service";
import {ToastService} from "../../../../services/toast.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-subject',
  templateUrl: './update-subject.component.html',
  styleUrls: ['./update-subject.component.scss']
})
export class UpdateSubjectComponent implements OnInit {
  // *************** Declaration part ******************* //
  form: FormGroup;
  subjectId: string | null;

  constructor(private fb: FormBuilder,
              private authService: AuthentificationService,
              private toastService: ToastService,
              private router: Router,
              private route: ActivatedRoute) {
    this.form = this.fb.group({
      // todo validator personalized
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
    });
    this.subjectId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {

  }

  submit() {
    // todo submit
    console.log(this.form.status === "VALID");
    console.log(this.form.status === "INVALID");
    console.log(this.form.value);

    console.log(this.subjectId);

    this.toastService.newToast("Update subject...", true)
    //  todo call api
  }
}
