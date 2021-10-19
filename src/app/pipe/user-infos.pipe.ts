import {Pipe, PipeTransform} from '@angular/core';
import {User} from "../interfaces/user";

@Pipe({
  name: 'userInfos'
})
export class UserInfosPipe implements PipeTransform {

  transform(users: User | undefined | null): string {
    if (!!users) {
      return `${users.last_name} ${users.first_name} - ${users.classe?.title}`;
    }
    return '';
  }

}
