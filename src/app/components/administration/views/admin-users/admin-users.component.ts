import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../../interfaces/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  @Input() usersList: Array<User> | undefined;
  display : boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // change(user:User){
  //   // this.router.navigateByUrl(`/admin/user/${user.id}`);
  // }

  delete(user:User){
    // todo call api delete classes
    console.log("delete ")
    console.log(user)
  }
}
