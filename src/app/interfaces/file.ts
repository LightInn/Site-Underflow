import {Thread} from "./thread";

export interface File {
  id: bigint
  title: string
  link: string
  thread: Thread
}
