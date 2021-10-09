import {Classe} from "./classe";
import {Subject} from "./subject";

export interface Suggest {
  id?: number
  title?:string|null
  date_butoir?: string|null
  classe?: Classe|null
  subject?: Subject|null
}
