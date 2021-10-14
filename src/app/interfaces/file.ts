import {Thread} from "./thread";

export interface File {
  id?: number
  title?: string|null
  link?: string|null
  thread?: Thread|null
}
