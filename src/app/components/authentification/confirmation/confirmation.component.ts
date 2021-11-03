import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthentificationService} from "../../../services/authentification.service";
import {ToastService} from "../../../services/toast.service";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  // *************** Declaration part ******************* //
  email: string = '';
  disableButton: boolean = true;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authentificationService: AuthentificationService,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.email = String(this.route.snapshot.paramMap.get('email'));
    setTimeout(() => {
      this.disableButton = false;
    }, 5000)
  }

  reSendMail() {
    this.authentificationService.requestConfirmation({email: this.email}).subscribe(
      response => {
        this.toastService.newToast('Email envoyé avec succès', false)
        this.disableButton = true
      }, error => {
        this.toastService.newToast(error.error.error, true);
      }
    )
  }

  /**
   * Redirect on login page
   */
  goLogin() {
    this.router.navigateByUrl("/login")
  }

}
