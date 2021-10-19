import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../interfaces/user";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  @Input() usersList: Array<User> | undefined;
  display : boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  change(user:User){

  }

  delete(user:User){

  }
}
