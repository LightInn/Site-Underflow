import {Classe} from "./classe";
import {Subject} from "./subject";

export interface Proposition {
  id?: bigint
  title?: string
  date_butoir?: Date
  classe?: Classe
  subject?: Subject
}
