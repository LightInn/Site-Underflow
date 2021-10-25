import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthentificationService} from "../../../services/authentification.service";
import {ToastService} from "../../../services/toast.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {regexMailCreated} from "../../../constants/authorized.mail";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('loadPage',
      [
        state('load', style(
          {
            opacity: 1,
            // transform: 'translateY(0px)',
            height: '100%'
          })),
        state('unload', style({
          opacity: 0,
          // transform: 'translateY(1200px)',
          height: '0%'
        })),
        transition('load => unload', [
          animate('0.5s')
        ]),
        transition('unload => load', [
          animate('1s')
        ]),
      ]),
  ],
})
export class LoginComponent implements OnInit {
  // *************** Declaration part ******************* //
  form: FormGroup;
  loading: boolean = false;

  /**
   * We declare all flag for errors (for profile)
   */
  error_email: boolean = false;
  error_password: boolean = false;
  error_flag: boolean = false;

  constructor(private fb: FormBuilder,
              private authService: AuthentificationService,
              private toastService: ToastService,
              private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(regexMailCreated)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)]]
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = true;
      console.log(this.loading)
    }, 2000)
  }

  login() {
    this.error_flag = false;
    // Check the form controls
    for (const control in this.form.controls) {
      switch (control) {
        case 'email':
          if (!!this.form.controls[control].errors) {
            this.error_email = true;
            this.error_flag = true;
          } else {
            this.error_flag = false;
          }
          break;
        case 'password':
          if (!!this.form.controls[control].errors) {
            this.error_password = true;
            this.error_flag = true;
          } else {
            this.error_flag = false;
          }
          break;
      }
    }
    console.log(this.form.value);
    if (this.form.status === "VALID") {
      if (!this.error_flag) {
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
                console.log("error in login");
                this.toastService.newToast(error.error.error, true)
              }
            );
        }
      }
    }
  }

  register() {
    this.router.navigateByUrl("/register");
  }
}
