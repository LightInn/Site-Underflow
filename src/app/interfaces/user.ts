import {Classe} from "./classe";

export interface User {
  id?: string
  alternative_id?: string
  first_name?: string
  last_name?: string
  email?: string
  // On l'aura jamais
  // password: string
  activated?: boolean
  admin?: boolean
  created_on?: string
  last_login?: string|null
  classe?: Classe|null
}
