import {User} from "./user";
import {Thread} from "./thread";

export interface Comment {
  id: bigint
  text: string
  created_on: Date
  owner: User
  thread: Thread
}

