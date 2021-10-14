import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthentificationService} from "../../../services/authentification.service";
import {ToastService} from "../../../services/toast.service";
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthentificationService,
              private toastService: ToastService,
              private router: Router) {

    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }


  login() {
    const val = this.form.value;
    this.toastService.newToast("Connexion...", true)
    if (val.email && val.password) {
      this.authService.login(val.email, val.password)
        .subscribe(
          jwt => {
            this.toastService.newToast("Connecter", false)

            this.authService.setSession(jwt);
            this.router.navigateByUrl('/')
          },
          error => {
            this.toastService.newToast(error.error.error, true)
          }
        );
    }
  }


  register() {
    this.router.navigateByUrl("/register");
  }
}
