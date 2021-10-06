import {Courses} from "./course";
import {User} from "./user";

export interface CourseSubscription {
  id?: bigint
  confirmed?: boolean
  date_butoir?: Date
  participant?: User
  course?: Courses
}
