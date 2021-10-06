import {Subject} from "./subject";
import {User} from "./user";

export interface SubjectAdmin extends Subject{
  proposedBy : User
  validation: boolean
}
