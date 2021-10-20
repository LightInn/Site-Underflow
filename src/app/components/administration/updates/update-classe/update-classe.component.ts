import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthentificationService} from "../../../../services/authentification.service";
import {ToastService} from "../../../../services/toast.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-classes',
  templateUrl: './update-classe.component.html',
  styleUrls: ['./update-classe.component.scss']
})
export class UpdateClasseComponent implements OnInit {
  // *************** Declaration part ******************* //
  form: FormGroup;
  classeId: string | null;

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
    this.classeId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {

  }

  submit() {
    // todo submit
    console.log(this.form.status === "VALID")
    console.log(this.form.status === "INVALID")
    console.log(this.form.value)

    console.log(this.classeId)

    this.toastService.newToast("Update classe...", true)
    //  todo call api
  }
}
