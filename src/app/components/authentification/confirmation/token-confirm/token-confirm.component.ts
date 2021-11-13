import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthentificationService} from "../../../../services/authentification.service";
import {ToastService} from "../../../../services/toast.service";

@Component({
  selector: 'app-token-confirm',
  templateUrl: './token-confirm.component.html',
  styleUrls: ['./token-confirm.component.scss']
})
export class TokenConfirmComponent implements OnInit {
  // *************** Declaration part ******************* //
  token: string = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authentificationService: AuthentificationService,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.token = String(this.route.snapshot.paramMap.get('token'));
    this.authentificationService.requestTokenConfirmation(this.token).subscribe(
      jwt => {
        this.toastService.newToast("Connecté", false)
        this.authentificationService.setSession(jwt);
        this.router.navigateByUrl('/les-cours')
      }, error => {
        this.toastService.newToast(error.error.status, true);
      }
    )
  }

}
