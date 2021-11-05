import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject} from "../../../../interfaces/subject";
import {Classe} from "../../../../interfaces/classe";
import {User} from "../../../../interfaces/user";
import {Courses} from "../../../../interfaces/course";
import {ToastService} from "../../../../services/toast.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SubjectsService} from "../../../../services/callAPI/subjects.service";
import {ClassesService} from "../../../../services/callAPI/classes.service";
import {UsersService} from "../../../../services/callAPI/users.service";
import {ParticipantsService} from "../../../../services/callAPI/participants.service";
import {CoursesService} from "../../../../services/callAPI/courses.service";
import {toFormDateLocaleString} from "../../../../functions/dateFormat";

@Component({
  selector: 'app-user-update-course',
  templateUrl: './user-update-course.component.html',
  styleUrls: ['./user-update-course.component.scss']
})
export class UserUpdateCourseComponent implements OnInit {

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
      duration: [''],
      closed: ['', [Validators.required]],
    });
    this.courseId = String(this.route.snapshot.paramMap.get('id'));
  }

  /**
   * function to trigger the data initializations
   */
  ngOnInit(): void {
    this.subjectsService.subjects(true).subscribe(
      response => {
        this.subjectslist = response;
      }, error => {
        this.toastService.newToast(error.error.error, true);
      }
    )
    this.classesService.classes(true).subscribe(
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
          this.form.controls['subjects'].setValue(response[0].subject?.id);
          this.form.controls['classes'].setValue(response[0].classe?.id);
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

  /**
   * Change attendance of a people on a course
   * Display message on change on attendance
   * @param userEmail
   */
  toggle_presence(userEmail: string | undefined) {
    this.usersRegistredOnCourse.requestToggleUserAttendance(Number(this.courseId) ?? -1, userEmail ?? '').subscribe(
      response => {
        if (response.present != undefined) {
          let message = response.present ? "Tu es inscrit !" : "Tu es désinscrit !";
          this.toastService.newToast(message, true);
        }
      },
      error => {
        this.toastService.newToast(error.error.error, true);
      }
    )
  }

  /**
   * Submit function, we send all data on this function
   * and we trigger validators to the form
   */
  submit() {
    // ********************* Reset Validators Flags ************************* //
    this.error_title = false;
    this.error_subjects = false;
    this.error_classes = false;
    this.error_description = false;
    this.error_date = false;
    this.error_duration = false;
    this.error_closed = false;
    this.error_flag = false;
    // Check the form controls
    for (const control in this.form.controls) {
      switch (control) {
        case 'title':
          if (!!this.form.controls[control].errors) {
            this.error_title = true;
          }
          break;
        case 'subjects':
          if (!!this.form.controls[control].errors) {
            this.error_subjects = true;
          }
          break;
        case 'classes':
          if (!!this.form.controls[control].errors) {
            this.error_classes = true;
          }
          break;
        case 'description':
          if (!!this.form.controls[control].errors) {
            this.error_description = true;
          }
          break;
        case 'date':
          if (!!this.form.controls[control].errors) {
            this.error_date = true;
          }
          break;
        case 'duration':
          if (!(this.form.controls['closed'].value === false))
            // the toggle is set to true
            if (this.form.controls[control].value != '') {
              this.error_duration = true;
            }
          break;
        case 'closed':
          if (!!this.form.controls[control].errors) {
            this.error_closed = true;
          }
          break;
      }
    }

    // Send error message to the toast service
    if (this.error_title ||
      this.error_subjects ||
      this.error_classes ||
      this.error_description ||
      this.error_date ||
      this.error_duration ||
      this.error_closed) {
      this.error_flag = true
      this.toastService.newToast("Erreur...", true)
    } else {
      this.error_flag = false
    }

    if (this.form.status === "VALID") {
      if (!this.error_flag) {
        if (!this.form.value.closed) {
          this.coursesService.requestUpdateCourseSpecific(
            this.form.value.id,
            {
              title: this.form.value.title,
              subject: this.form.value.subjects,
              classe: this.form.value.classes,
              owner: this.form.value.user,
              date_start: this.form.value.date,
              duration: this.form.value.duration ?? null,
            }
          ).subscribe(
            response => {
              this.toastService.newToast("Cours bien modifié", false);
            }, error => {
              this.toastService.newToast(error.error.error, true);
            }
          )
        } else {
          this.coursesService.requestClotureCourse(this.form.value.id).subscribe(
            response => {
              this.router.navigate(['profile'])
              this.toastService.newToast("Cours clos, merci !", false);
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
