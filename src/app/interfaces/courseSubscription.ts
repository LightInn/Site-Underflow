import {User} from "./user";
import {Subject} from "./subject";
import {Classe} from "./classe";

export interface CourseSubscription {
  id?:number
  title?:string|null
  date_start?:string|null
  duration?:number|null
  ended?:boolean|null
  owner?:User|null
  subject?:Subject|null
  classe?:Classe|null
  description?:string|null
  room?:string|null
}
