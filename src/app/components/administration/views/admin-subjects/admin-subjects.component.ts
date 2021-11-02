import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from "../../../../interfaces/subject";
import {Router} from "@angular/router";
import {ToastService} from "../../../../services/toast.service";
import {SubjectsService} from "../../../../services/callAPI/subjects.service";

@Component({
  selector: 'app-admin-subjects',
  templateUrl: './admin-subjects.component.html',
  styleUrls: ['./admin-subjects.component.scss']
})
export class AdminSubjectsComponent implements OnInit {
  // *************** Declaration part ******************* //
  @Input() subjectsList: Array<Subject> | undefined;
  display: boolean = true;

  @Output() emitResetCallback_subject = new EventEmitter();
  validation: boolean = false;
  subjectToDelete: Subject = {};

  constructor(private router: Router,
              private subjectService: SubjectsService,
              private toastService: ToastService) {
  }

  /**
   * function to trigger the data initializations
   */
  ngOnInit(): void {
    if(this.subjectsList?.length){
      this.display = false;
    } else {
      this.display = true;
    }
  }

  /**
   * Redirect on update page
   * @param subject
   */
  change(subject: Subject) {
    this.router.navigateByUrl(`/admin/subject/${subject.id}`);
  }

  /**
   * display validation message
   * @param subject
   */
  clickDelete(subject: Subject) {
    this.validation = true;
    this.subjectToDelete = subject;
  }

  /**
   * call to delete element to API
   */
  delete() {
    this.subjectService.requestDeleteSubject(this.subjectToDelete).subscribe(
      response => {
        this.validation = false;
        this.toastService.newToast("Matière bien supprimée", false);
        this.emitResetCallback_subject.emit();
      }, error => {
        this.validation = false;
        this.toastService.newToast("La matière possède encore des liens", true);
      }
    )
  }

  /**
   * Redirect to add subject page
   */
  clickAdd() {
    this.router.navigateByUrl('/admin/add_subject');
  }
}
