import {Classe} from "./classe";

export interface User {
  id?: string
  alternative_id?: string
  first_name?: string
  last_name?: string
  email?: string
  activated?: boolean
  admin?: boolean
  created_on?: string
  last_login?: string | null
  classe?: Classe | null
  present?: boolean | null
}
