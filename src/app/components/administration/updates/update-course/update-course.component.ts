import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthentificationService} from "../../../../services/authentification.service";
import {ToastService} from "../../../../services/toast.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "../../../../interfaces/subject";
import {Classe} from "../../../../interfaces/classe";
import {User} from "../../../../interfaces/user";

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.scss']
})
export class UpdateCourseComponent implements OnInit {
  form: FormGroup;
  courseId: string | null;
  subjectslist: Array<Subject>;
  classesList: Array<Classe>;
  usersList: Array<User>;

  display: boolean = true;
  usersListRegistred: Array<User>;

  constructor(private fb: FormBuilder,
              private authService: AuthentificationService,
              private toastService: ToastService,
              private router: Router,
              private route: ActivatedRoute) {
    this.form = this.fb.group({
      // todo validator personalized
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      subjects: ['', [Validators.required]],
      classes: ['', [Validators.required]],
      user: ['', [Validators.required]],
      date: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      closed: ['', [Validators.required]],
    });
    this.courseId = this.route.snapshot.paramMap.get('id');
    //  todo recup data from store
    this.subjectslist = [];
    this.classesList = [];
    this.usersList = [];
    this.usersListRegistred = [
      {
        id: "981477da-31c3-4887-b98f-6f9cc0f44e40",
        first_name: "Andy",
        last_name: "Cinquin",
        classe: {id: 3, title: "B3"},
        email: "andy.cinquin@epsi.fr"
      }
    ];
  }

  ngOnInit(): void {
  }

  submit() {
    // todo submit
    console.log(this.form.status === "VALID")
    console.log(this.form.status === "INVALID")
    console.log(this.form.value)

    console.log(this.courseId)

    this.toastService.newToast("Update classe...", true)
    //  todo call api
  }

  delete(user: User) {
    // Todo call api delete user

  }
}
