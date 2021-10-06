import {User} from "./user";

export interface Thread {
  id?: bigint
  title?: string
  owner?: User
}
