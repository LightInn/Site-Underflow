import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "../../../../interfaces/subject";
import {Classe} from "../../../../interfaces/classe";
import {AuthentificationService} from "../../../../services/authentification.service";
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
   * @param authService -> to use the auth service
   * @param toastService -> to display messages with popup service
   * @param router -> to swap on another page on submit
   * @param classeService
   * @param subjectService
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

  ngOnInit(): void {
    this.classeService.classes().subscribe(
      classes => {
        this.classesList = classes;
      }, error => {
        this.toastService.newToast(error.error.error, true);
      }
    )
    this.subjectService.subjects().subscribe(
      subjects => {
        this.subjectslist = subjects;
      }, error => {
        this.toastService.newToast(error.error.error, true);
      }
    )
  }

  /**
   * submit function for the suggestion,
   * we also test here all our fields to validate the form or display message errors
   */
  submit() {
    this.error_flag = false;
    // ******************* Validation part ******************** //
    for (const control in this.form.controls) {
      switch (control) {
        case 'title':
          if (!!this.form.controls[control].errors) {
            this.error_title = true;
            this.error_flag = true;
          } else {
            this.error_title = false;
          }

          break;
        case 'date_butoir':
          if (!!this.form.controls[control].errors) {
            this.error_date = true;
            this.error_flag = true;
          } else {
            this.error_date = false;
          }
          break;
        case 'subjects':
          if (!!this.form.controls[control].errors) {
            this.error_subject = true;
            this.error_flag = true;
          } else {
            this.error_subject = false;
          }
          break;
        case 'classes':
          if (!!this.form.controls[control].errors) {
            this.error_classe = true;
            this.error_flag = true;
          } else {
            this.error_classe = false;
          }
          break;
      }
    }
    // Send error message to the toast service
    this.error_flag ? this.toastService.newToast("Erreur...", true) : this.toastService.newToast("Suggestion envoyée...", false);

    // Verify if the form is valid or not , and create suggestions / subjects
    if (this.form.status === "VALID") {
      let subject = this.subjectslist?.find(({title}) => title === this.form.value.subject);
      if (!this.error_flag) {
        if (!!subject) {
          // if the subject is already created, then just create the new suggestion
          this.suggestionsService.addSuggestion({
            title: this.form.value.title,
            subject: subject,
            date_butoir: this.form.value.date_butoir,
            classe: this.form.value.classe
          }).subscribe(
            response => {
              this.toastService.newToast("Votre propositon à été créée", true);
            }, error => {
              this.toastService.newToast(error.error.error, true);
            }
          )
        } else {
          // else, we need to create both, suggestion & subject
          this.subjectService.addSubject({
            id: 0,
            title: this.form.value.subject
          }).subscribe(
            subject_created => {
              // when we have the response for the creation of subject, we create the suggestion
              this.suggestionsService.addSuggestion({
                title: this.form.value.title,
                subject: subject_created,
                date_butoir: this.form.value.date_butoir,
                classe: this.form.value.classe
              }).subscribe(
                response => {
                  this.toastService.newToast("Votre propositon à été créée", true);
                }, error => {
                  this.toastService.newToast(error.error.error, true);
                }
              )
            }, error => {
              this.toastService.newToast(error.error.error, true);
            }
          )
        }
      }
    }
  }
}