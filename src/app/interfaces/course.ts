import {User} from "./user"
import {Subject} from "./subject"
import {Classe} from "./classe"

export interface Courses {
  id?:number
  title?:string
  date_start?:Date
  duration?:number
  ended?:boolean
  user?:User
  subject?:Subject
  classe?:Classe
}
