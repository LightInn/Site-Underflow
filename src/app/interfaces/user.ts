import {Classe} from "./classe";

export interface User {
  id?: bigint
  first_name?: string
  last_name?: string
  email?: string
  // On l'aura jamais
  // password: string
  activated?: boolean
  admin?: boolean
  created_on?: Date
  last_login?: Date
  classe?: Classe
}
