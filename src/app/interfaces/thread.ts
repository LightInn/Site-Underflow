import {User} from "./user";

export interface Thread {
  id?: number
  title?: string
  owner?: User
}
