import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastService} from "../../../../services/toast.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "../../../../interfaces/subject";
import {Classe} from "../../../../interfaces/classe";
import {User} from "../../../../interfaces/user";
import {SubjectsService} from "../../../../services/callAPI/subjects.service";
import {ClassesService} from "../../../../services/callAPI/classes.service";
import {UsersService} from 'src/app/services/callAPI/users.service';
import {ParticipantsService} from "../../../../services/callAPI/participants.service";
import {Courses} from "../../../../interfaces/course";
import {CoursesService} from "../../../../services/callAPI/courses.service";
import {toFormDateLocaleString} from "../../../../functions/dateFormat";

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.scss']
})
export class UpdateCourseComponent implements OnInit {
  // *************** Declaration part ******************* //
  form: FormGroup;
  courseId: string | null;
  subjectslist?: Array<Subject>;
  classesList?: Array<Classe>;
  usersList?: Array<User>;
  display: boolean = true;
  usersListRegistred?: Array<User>;

  actualCourse?: Courses;
  /**
   * We declare all flag for errors (for profile)
   */
  error_title: boolean = false;
  error_subjects: boolean = false;
  error_classes: boolean = false;
  error_description: boolean = false;
  error_date: boolean = false;
  error_duration: boolean = false;
  error_closed: boolean = false;
  error_flag: boolean = false;

  constructor(private fb: FormBuilder,
              private toastService: ToastService,
              private router: Router,
              private route: ActivatedRoute,
              private subjectsService: SubjectsService,
              private classesService: ClassesService,
              private usersService: UsersService,
              private usersRegistredOnCourse: ParticipantsService,
              private coursesService: CoursesService) {
    this.form = this.fb.group({
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      subjects: ['', [Validators.required]],
      classes: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      closed: ['', [Validators.required]],
    });
    this.courseId = String(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.subjectsService.subjects().subscribe(
      response => {
        this.subjectslist = response;
      }, error => {
        this.toastService.newToast(error.error.error, true);
      }
    )
    this.classesService.classes().subscribe(
      response => {
        this.classesList = response;
      }, error => {
        this.toastService.newToast(error.error.error, true);
      }
    )
    this.usersService.users().subscribe(
      response => {
        this.usersList = response;
      }, error => {
        this.toastService.newToast(error.error.error, true);
      }
    )
    this.usersRegistredOnCourse.participants(Number(this.courseId)).subscribe(
      response => {
        this.usersListRegistred = response;
      }, error => {
        this.toastService.newToast(error.error.error, true);
      }
    )
    this.coursesService.requestCourseSpecific(Number(this.courseId)).subscribe(
      response => {
        if (response.length) {
          this.actualCourse = response[0];
          this.form.controls['id'].setValue(this.courseId);
          this.form.controls['title'].setValue(response[0].title);
          this.form.controls['subjects'].setValue(response[0].subject?.title);
          this.form.controls['classes'].setValue(response[0].classe?.title);
          this.form.controls['date'].setValue(toFormDateLocaleString(new Date(String(response[0].date_start))));
          this.form.controls['description'].setValue(response[0].description);
          this.form.controls['duration'].setValue(response[0].duration);
          this.form.controls['closed'].setValue(response[0].ended);
        } else {
          this.toastService.newToast("Le cours n'existe pas !", true);
          this.router.navigate(['not-found'])
        }
      }, error => {
        this.toastService.newToast(error.error.error, true);
        this.router.navigate(['not-found'])
      }
    )
  }

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
            this.error_flag = false;
          }
          break;
        case 'subjects':
          if (!!this.form.controls[control].errors) {
            this.error_subjects = true;
            this.error_flag = true;
          } else {
            this.error_flag = false;
          }
          break;
        case 'classes':
          if (!!this.form.controls[control].errors) {
            this.error_classes = true;
            this.error_flag = true;
          } else {
            this.error_flag = false;
          }
          break;
        case 'description':
          if (!!this.form.controls[control].errors) {
            this.error_description = true;
            this.error_flag = true;
          } else {
            this.error_flag = false;
          }
          break;
        case 'date':
          if (!!this.form.controls[control].errors) {
            this.error_date = true;
            this.error_flag = true;
          } else {
            this.error_flag = false;
          }
          break;
        case 'duration':
          if (!!this.form.controls[control].errors) {
            this.error_duration = true;
            this.error_flag = true;
          } else {
            this.error_flag = false;
          }
          break;
        case 'closed':
          if (!!this.form.controls[control].errors) {
            this.error_closed = true;
            this.error_flag = true;
          } else {
            this.error_flag = false;
          }
          break;
      }

      // Send error message to the toast service
      if (this.error_flag) {
        this.toastService.newToast("Erreur...", true)
      }

      if (this.form.status === "VALID") {
        if (!this.error_flag) {
          this.coursesService.requestUpdateCourseSpecific(
            this.form.value.id,
            {
              title:this.form.value.title,
              subject:this.form.value.subjects,
              classe:this.form.value.classes,
              owner:this.form.value.user,
              date_start:this.form.value.date,
              duration:this.form.value.duration,
              ended:this.form.value.closed
            }
          ).subscribe(
            response => {
              this.toastService.newToast("Cours bien modifié", false);
            }, error => {
              this.toastService.newToast(error.error.error, true);
            }
          )
        }
      }
    }
  }

  delete(user: User) {
    // Todo call api delete user registrations from course

  }
}
