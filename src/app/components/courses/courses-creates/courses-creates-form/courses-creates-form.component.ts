import {Component, OnInit} from '@angular/core';
import {Subject} from "../../../../interfaces/subject";
import {Classe} from "../../../../interfaces/classe";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthentificationService} from "../../../../services/authentification.service";
import {ToastService} from "../../../../services/toast.service";
import {Router} from "@angular/router";
import {toFormDateLocaleString} from "../../../../functions/dateFormat";
import {ClassesService} from "../../../../services/callAPI/classes.service";
import {SubjetsService} from "../../../../services/callAPI/subjets.service";
import {CoursesService} from "../../../../services/callAPI/courses.service";

@Component({
  selector: 'app-courses-creates-form',
  templateUrl: './courses-creates-form.component.html',
  styleUrls: ['./courses-creates-form.component.scss']
})
export class CoursesCreatesFormComponent implements OnInit {
  // *************** Declaration part ******************* //
  subjectslist ?: Array<Subject>;
  classesList ?: Array<Classe>
  form: FormGroup;
  /**
   * We limit here & in the constructor the field for date
   * -> 120 day after for the max
   * -> now for the min limit
   */
  date_min: string;
  date_max: string;

  /**
   * We declare all flag for errors
   */
  error_title: boolean = false;
  error_date: boolean = false;
  error_subject: boolean = false;
  error_classe: boolean = false;
  error_description: boolean = false;
  error_flag: boolean = false;

  /**
   * The constructor, take differents parameters, it's automatic in angular,
   * we use differents values with it
   * @param fb -> to create our form, and initialize Validators
   * @param toastService -> to display messages with popup service
   * @param router -> to swap on another page on submit
   * @param classeService
   * @param subjectService
   * @param courseService
   */
  constructor(private fb: FormBuilder,
              private toastService: ToastService,
              private router: Router,
              private classeService: ClassesService,
              private subjectService: SubjetsService,
              private courseService: CoursesService) {
    this.form = this.fb.group({
      // todo validator personalized
      title: ['', [Validators.required]],
      date: ['', [Validators.required]],
      subjects: ['', [Validators.required]],
      classes: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });

    /**
     * we set the limit here for the max value
     * change de "120" value to an another value if you want more flexibility on date
     * for the suggestions
     */
    var date = new Date(Date.now());
    date.setDate(date.getDate() + 120);
    this.date_min = toFormDateLocaleString(new Date(Date.now()));
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
   * submit function to create a new course,
   * we also test here all our fields to validate the form or display message errors
   */
  submit() {
    this.error_flag = false;
    // Check the form controls
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
        case 'date':
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
        case 'description':
          if (!!this.form.controls[control].errors) {
            this.error_description = true;
            this.error_flag = true;
          } else {
            this.error_description = false;
          }
          break;
      }
    }
    // Send error message to the toast service
    this.error_flag ? this.toastService.newToast("Erreur...", true) : this.toastService.newToast("Cours créé...", false);

    // Verify if the form is valid or not , and create suggestions / subjects
    if (this.form.status === "VALID") {
      if (!this.error_flag) {
        let subject = this.subjectslist?.find(({title}) => title === this.form.value.subject);
        let classe = this.classesList?.find(({title}) => title === this.form.value.classe);
        this.courseService.addCourse({
          title:this.form.value.title,
          subject:subject,
          date_start:this.form.value.date_start,
          classe:classe,
          description: this.form.value.description,
          ended:false
        })
      }
    }
  }
}
