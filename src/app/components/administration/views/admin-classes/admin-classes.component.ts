import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Classe} from "../../../../interfaces/classe";
import {Router} from "@angular/router";
import {ClassesService} from "../../../../services/callAPI/classes.service";
import {ToastService} from "../../../../services/toast.service";

@Component({
  selector: 'app-admin-classes',
  templateUrl: './admin-classes.component.html',
  styleUrls: ['./admin-classes.component.scss']
})
export class AdminClassesComponent implements OnInit {
  // *************** Declaration part ******************* //
  @Input() classesList: Array<Classe> | undefined;
  @Output() emitResetCallback_classe = new EventEmitter();
  display: boolean = true;
  validation: boolean = false;
  classeToDelete: Classe = {};

  constructor(private router: Router,
              private classeService: ClassesService,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    if (this.classesList?.length) {
      this.display = false;
    } else {
      this.display = true;
    }
  }

  change(classe: Classe) {
    this.router.navigateByUrl(`/admin/classe/${classe.id}`);
  }

  clickDelete(classe: Classe) {
    this.validation = true;
    this.classeToDelete = classe;
  }

  delete() {
    // todo call api delete classe
    this.classeService.requestDeleteClasse(this.classeToDelete).subscribe(
      response => {
        this.validation = false;
        this.toastService.newToast("Classe bien supprimée", false);
        this.emitResetCallback_classe.emit();
      }, error => {
        this.validation = false;
        this.toastService.newToast("La classe possède encore des liens", true);
      }
    )
  }

  clickAdd() {
    this.router.navigateByUrl('/admin/add_classe');
  }
}
