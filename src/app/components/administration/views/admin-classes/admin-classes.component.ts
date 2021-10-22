import {Component, Input, OnInit} from '@angular/core';
import {Classe} from "../../../../interfaces/classe";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-classes',
  templateUrl: './admin-classes.component.html',
  styleUrls: ['./admin-classes.component.scss']
})
export class AdminClassesComponent implements OnInit {
  // *************** Declaration part ******************* //
  @Input() classesList: Array<Classe> | undefined;
  display: boolean = true;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if(!this.classesList){
      this.display = false;
    } else {
      this.display = true;
    }
  }

  change(classe: Classe) {
    this.router.navigateByUrl(`/admin/classe/${classe.id}`);
  }

  delete(classe: Classe) {
    // todo call api delete classes

  }
}
