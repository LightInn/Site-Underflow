import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent implements OnInit {
  // *************** Declaration part ******************* //
  @Input() returnEnable : boolean = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * redirect to the admin page
   */
  clickEventBack(){
    this.router.navigateByUrl('/admin')
  }
}
