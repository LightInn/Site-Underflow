import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthentificationService} from "../../../../services/authentification.service";
import {ToastService} from "../../../../services/toast.service";

@Component({
  selector: 'app-pre-confirmation',
  templateUrl: './pre-confirmation.component.html',
  styleUrls: ['./pre-confirmation.component.scss']
})
export class PreConfirmationComponent implements OnInit {
  // *************** Declaration part ******************* //
  email: string = '';

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (!!this.router?.getCurrentNavigation()?.extras?.state?.email) {
      this.email = this.router?.getCurrentNavigation()?.extras?.state?.email;
    }
  }

  goConfirmation() {
    this.router.navigate(['/confirmation'], {state: {email: this.email}});
  }
}
