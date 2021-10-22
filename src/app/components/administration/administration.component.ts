import {Component, OnInit} from '@angular/core';
import {Subject} from "../../interfaces/subject";
import {Classe} from "../../interfaces/classe";
import {User} from "../../interfaces/user";
import {toFormDateLocaleString} from "../../functions/dateFormat";
import {Courses} from "../../interfaces/course";
import {ClassesService} from "../../services/callAPI/classes.service";
import {UserService} from "../../services/callAPI/user.service";
import {UsersService} from "../../services/callAPI/users.service";
import {SubjectsService} from "../../services/callAPI/subjects.service";
import {CoursesService} from "../../services/callAPI/courses.service";
import {ToastService} from "../../services/toast.service";
import {Suggest} from "../../interfaces/suggest";
import {SuggestionsService} from "../../services/callAPI/suggestions.service";

@Component({
    selector: 'app-administration',
    templateUrl: './administration.component.html',
    styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
    // *************** Declaration part ******************* //
    classesList?: Array<Classe>;
    subjectslist?: Array<Subject>;
    actualUser?: User;
    userslist?: Array<User>;
    coursesList?: Array<Courses>;
    suggestsList?: Array<Suggest>;


    constructor(private toastService: ToastService,
                private classesService: ClassesService,
                private subjectsService: SubjectsService,
                private userInfoService: UserService,
                private usersService: UsersService,
                private coursesService: CoursesService,
                private suggestionsService: SuggestionsService) {
    }

    ngOnInit(): void {
        this.classesService.classes().subscribe(
            response => {
                this.classesList = response;
            }, error => {
                this.toastService.newToast(error.error.error, true);
            }
        )
        this.subjectsService.subjects().subscribe(
            response => {
                this.subjectslist = response;
            }, error => {
                this.toastService.newToast(error.error.error, true);
            }
        )
        this.userInfoService.user().subscribe(
            response => {
                this.actualUser = response;
            }, error => {
                this.toastService.newToast(error.error.error, true);
            }
        )
        this.usersService.users().subscribe(
            response => {
                this.userslist = response;
            }, error => {
                this.toastService.newToast(error.error.error, true);
            }
        )
        this.coursesService.courses().subscribe(
            response => {
                this.coursesList = response;
            }, error => {
                this.toastService.newToast(error.error.error, true);
            }
        )
        this.suggestionsService.suggests().subscribe(
            response => {
                this.suggestsList = response;
            }, error => {
                this.toastService.newToast(error.error.error, true);
            }
        )

    }
}
