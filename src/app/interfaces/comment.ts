import {User} from "./user";
import {Thread} from "./thread";

export interface Comment {
  id?: number
  text?: string
  created_on?: Date
  owner?: User
  thread?: Thread
}
