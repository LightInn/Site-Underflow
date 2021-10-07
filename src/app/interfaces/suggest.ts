import {Classe} from "./classe";
import {Subject} from "./subject";

export interface Suggest {
  id?: number
  date_butoir?: Date
  classe?: Classe
  subject?: Subject
}
