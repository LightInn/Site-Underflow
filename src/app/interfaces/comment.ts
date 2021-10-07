import {User} from "./user";
import {Thread} from "./thread";

export interface Comment {
  id?: number
  text?: string|null
  created_on?: string
  owner?: User|null
  thread?: Thread|null
}
