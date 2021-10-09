import {User} from "./user";

export interface Thread {
  id?: number
  title?: string|null
  owner?: User|null
}
