import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../../interfaces/user";
import {Router} from "@angular/router";
import {Suggest} from "../../../../interfaces/suggest";
import {SuggestionsService} from "../../../../services/callAPI/suggestions.service";
import {ToastService} from "../../../../services/toast.service";
import {UsersService} from "../../../../services/callAPI/users.service";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  // *************** Declaration part ******************* //
  @Input() usersList: Array<User> | undefined;
  display: boolean = true;

  @Output() emitResetCallback_user = new EventEmitter();
  validation: boolean = false;
  userToDelete: User = {};

  constructor(private router: Router,
              private usersService: UsersService,
              private toastService: ToastService) {
  }

  /**
   * function to trigger the data initializations
   */
  ngOnInit(): void {
    if(this.usersList?.length){
      this.display = false;
    } else {
      this.display = true;
    }
  }

  /**
   * Display validation message on click on delete button
   * @param user
   */
  clickDelete(user: User){
    this.validation = true;
    this.userToDelete = user;
  }

  /**
   * call api to delete user
   */
  delete() {
    // todo call api delete course
    this.usersService.requestDeleteUser(this.userToDelete).subscribe(
      response => {
        this.validation = false;
        this.toastService.newToast("Utilisateur bien supprimée", false);
        this.emitResetCallback_user.emit();
      }, error => {
        this.validation = false;
        this.toastService.newToast("L'utilisateur possède encore des liens", true);
      }
    )
  }
}
