import {Component, OnInit} from '@angular/core';
import {Subject} from "../../../../interfaces/subject";
import {Classe} from "../../../../interfaces/classe";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../../../services/toast.service";
import {Router} from "@angular/router";
import {toFormDateLocaleString} from "../../../../functions/dateFormat";
import {ClassesService} from "../../../../services/callAPI/classes.service";
import {SubjectsService} from "../../../../services/callAPI/subjects.service";
import {CoursesService} from "../../../../services/callAPI/courses.service";
import {Suggest} from "../../../../interfaces/suggest";
import {SuggestionsService} from "../../../../services/callAPI/suggestions.service";

@Component({
  selector: 'app-courses-creates-form',
  templateUrl: './courses-creates-form.component.html',
  styleUrls: ['./courses-creates-form.component.scss']
})
export class CoursesCreatesFormComponent implements OnInit {
  // *************** Declaration part ******************* //
  subjectslist ?: Array<Subject>;
  classesList ?: Array<Classe>;
  suggestsList ?: Array<Suggest>;
  form: FormGroup;

  suggestId: number = -1;
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
  error_room: boolean = false;
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
              private subjectService: SubjectsService,
              private courseService: CoursesService,
              private suggestService: SuggestionsService) {
    this.form = this.fb.group({
      // todo validator personalized
      title: ['', [Validators.required]],
      date: ['', [Validators.required]],
      subjects: ['', [Validators.required]],
      classes: ['', [Validators.required]],
      description: ['', [Validators.required]],
      room: ['', []],
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
    this.classeService.classes(true).subscribe(
      classes => {
        this.classesList = classes;
      }, error => {
        this.toastService.newToast(error.error.error, true);
      }
    )
    this.subjectService.subjects(true).subscribe(
      subjects => {
        this.subjectslist = subjects;
      }, error => {
        this.toastService.newToast(error.error.error, true);
      }
    )
    this.suggestService.suggests(true).subscribe(
      suggests => {
        this.suggestsList = suggests
      }, error => {
        this.toastService.newToast(error.error.error, true);
      }
    )
  }

  /**
   * Function to set data on the data form from the suggest component
   * @param suggest
   */
  suggestPicked(suggest: any) {
    this.suggestId = suggest.id;
    this.form.controls['title'].setValue(suggest.title);
    this.form.controls['date'].setValue(toFormDateLocaleString(new Date(Date.now())));
    this.form.controls['classes'].setValue(suggest?.classe?.id);
    this.form.controls['subjects'].setValue(suggest?.subject?.title);
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
        case 'room':
          if (!!this.form.controls[control].errors) {
            this.error_room = true;
            this.error_flag = true;
          } else {
            this.error_description = false;
          }
          break;
      }
    }
    // Send error message to the toast service
    this.error_flag ? this.toastService.newToast("Erreur...", true) : this.toastService.newToast("Cours créé...", false);

    console.log(this.form.value)
    // Verify if the form is valid or not , and create suggestions / subjects
    if (this.form.status === "VALID") {
      if (!this.error_flag) {
        let subjectIndex = this.subjectslist?.findIndex(({title}) => title === this.form.value.subjects);
        var subjectElem: Subject = {};
        if (this.subjectslist?.length) {
          subjectElem = (subjectIndex != undefined && subjectIndex >= 0) ? this.subjectslist[subjectIndex] : {};
        }
        this.courseService.addCourse({
          title: this.form.value.title,
          subject: (!!subjectElem) ?
            {
              id: subjectElem.id,
              title: this.form.value.subjects
            }
            : {
              id: 0,
              title: this.form.value.subjects
            },
          date_start: this.form.value.date,
          classe: {
            id: Number(this.form.value.classes)
          },
          description: this.form.value.description,
          room: this.form.value.room,
          proposition_id: this.suggestId
        }).subscribe(
          response => {
            // todo redirect to /userowner/course/id
            this.router.navigateByUrl('/user/course/'+response.id);
            this.toastService.newToast("Votre cours à été créé", false);
          }, error => {
            this.toastService.newToast(error.error.error, true);
          }
        )
      }
    }
  }
}
