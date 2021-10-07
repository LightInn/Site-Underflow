import {Courses} from "./course";
import {User} from "./user";

export interface CourseSubscription {
  id?: number
  confirmed?: boolean|null
  date_butoir?: string|null
  participant?: User|null
  course?: Courses|null
}
