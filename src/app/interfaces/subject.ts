import {User} from "./user";

export interface Subject {
  id?: number
  title?: string
  proposePar?:User
  validated?:boolean|null
}
