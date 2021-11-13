import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "../../../../interfaces/subject";
import {Classe} from "../../../../interfaces/classe";
import {ToastService} from "../../../../services/toast.service";
import {Router} from "@angular/router";
import {toFormDateLocaleString} from "../../../../functions/dateFormat";
import {ClassesService} from "../../../../services/callAPI/classes.service";
import {SubjectsService} from "../../../../services/callAPI/subjects.service";
import {SuggestionsService} from "../../../../services/callAPI/suggestions.service";

@Component({
  selector: 'app-courses-suggests-form',
  templateUrl: './courses-suggests-form.component.html',
  styleUrls: ['./courses-suggests-form.component.scss']
})
export class CoursesSuggestsFormComponent implements OnInit {
  // *************** Declaration part ******************* //
  subjectslist ?: Array<Subject>;
  classesList ?: Array<Classe>
  form: FormGroup;
  /**
   * We limit here & in the constructor the field for date
   * -> 120 day after for the max
   * -> now for the min limit
   */
  date_min: string = toFormDateLocaleString(new Date(Date.now()));
  date_max: string;

  /**
   * We declare all flag for errors
   */
  error_title: boolean = false;
  error_date: boolean = false;
  error_subject: boolean = false;
  error_classe: boolean = false;
  error_flag: boolean = false;

  /**
   * The constructor, take differents parameters, it's automatic in angular,
   * we use differents values with it
   * @param fb -> to create our form, and initialize Validators
   * @param toastService -> to display messages with popup service
   * @param router -> to swap on another page on submit
   * @param classeService
   * @param subjectService
   * @param suggestionsService
   */
  constructor(private fb: FormBuilder,
              private toastService: ToastService,
              private router: Router,
              private classeService: ClassesService,
              private subjectService: SubjectsService,
              private suggestionsService: SuggestionsService) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      date_butoir: ['', [Validators.required]],
      subjects: ['', [Validators.required]],
      classes: ['', [Validators.required]],
    });
    /**
     * we set the limit here for the max value
     * change de "120" value to an another value if you want more flexibility on date
     * for the suggestions
     */
    var date = new Date(Date.now());
    date.setDate(date.getDate() + 120);
    this.date_max = toFormDateLocaleString(date);
  }

  /**
   * Data initialization
   */
  ngOnInit(): void {
    this.classeService.classes(true).subscribe(
      classes => {
        this.classesList = classes;
      }, error => {
        this.toastService.newToast(error.error.status, true);
      }
    )
    this.subjectService.subjects(true).subscribe(
      subjects => {
        this.subjectslist = subjects;
      }, error => {
        this.toastService.newToast(error.error.status, true);
      }
    )
  }

  /**
   * submit function for the suggestion,
   * we also test here all our fields to validate the form or display message errors
   */
  submit() {
    // ********************* Reset Validators Flags ************************* //
    this.error_title = false;
    this.error_date = false;
    this.error_subject = false;
    this.error_classe = false;
    this.error_flag = false;
    // ******************* Validation part ******************** //
    for (const control in this.form.controls) {
      switch (control) {
        case 'title':
          if (!!this.form.controls[control].errors) {
            this.error_title = true;
          }

          break;
        case 'date_butoir':
          if (!!this.form.controls[control].errors) {
            this.error_date = true;
          }
          break;
        case 'subjects':
          if (!!this.form.controls[control].errors) {
            this.error_subject = true;
          }
          break;
        case 'classes':
          if (!!this.form.controls[control].errors) {
            this.error_classe = true;
          }
          break;
      }
    }
    // Send error message to the toast service
    if (this.error_title ||
      this.error_date ||
      this.error_subject ||
      this.error_classe) {
      this.error_flag = true
      this.toastService.newToast("Erreur...", true)
    } else {
      this.toastService.newToast("Suggestion envoyée...", false);
      this.error_flag = false
    }

    // Verify if the form is valid or not , and create suggestions / subjects
    if (this.form.status === "VALID") {
      let subjectIndex = this.subjectslist?.findIndex(({title}) => title == this.form.value.subjects);
      var subjectElem: Subject = {};
      if (this.subjectslist?.length) {
        subjectElem = (subjectIndex != undefined && subjectIndex >= 0) ? this.subjectslist[subjectIndex] : {};
      }
      console.log()
      if (!this.error_flag) {
        // if the subject is already created, then just create the new suggestion
        this.suggestionsService.addSuggestion({
          title: this.form.value.title,
          subject: (subjectElem
            && Object.keys(subjectElem).length === 0
            && Object.getPrototypeOf(subjectElem) === Object.prototype) ?
            {
              id: 0,
              title: this.form.value.subjects
            }
            : {
              id: subjectElem.id,
              title: this.form.value.subjects
            },
          date_butoir: this.form.value.date_butoir,
          classe: {
            id: Number(this.form.value.classes)
          }
        }).subscribe(
          response => {
            this.router.navigate(['/les-cours']);
            this.toastService.newToast("Votre propositon à été créée", false);
          }, error => {
            this.toastService.newToast(error.error.status, true);
          }
        )
      }
    }
  }
}
