import {Classe} from "./classe";
import {Subject} from "./subject";

export interface Proposition {
  id?: number
  title?: string
  date_butoir?: Date
  classe?: Classe
  subject?: Subject
}
