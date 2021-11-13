import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthentificationService} from "../../../services/authentification.service";
import {ToastService} from "../../../services/toast.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {regexMailCreated} from "../../../constants/authorized.mail";
import {regexPassword} from "../../../constants/regexValidators";

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
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(regexPassword)]]
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = true;
    }, 2000)
  }

  /**
   * trigger login function, validators and call api
   */
  login() {
    // ********************* Reset Validators Flags ************************* //
    this.error_password = false;
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
        case 'password':
          if (!!this.form.controls[control].errors) {
            this.error_password = true;
          }
          break;
      }
    }

    // Send error message to the toast service
    if (this.error_email ||
      this.error_password) {
      this.error_flag = true
      this.toastService.newToast("Erreur...", true)
    } else {
      this.error_flag = false
    }

    if (this.form.status === "VALID") {
      if (!this.error_flag) {
        const val = this.form.value;
        this.toastService.newToast("Connexion...", true)
        if (val.email && val.password) {
          this.authService.login(val.email, val.password)
            .subscribe(
              jwt => {
                this.toastService.newToast("Connecté", false)
                this.authService.setSession(jwt);
                this.router.navigateByUrl('/')
              },
              error => {
                this.toastService.newToast(error.error.status, true)
                if (error.error.activated === false) {
                  this.router.navigate(['/pre-confirmation'], {state: {email: error.error.email}});
                }
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
