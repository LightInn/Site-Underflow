import { Pipe, PipeTransform } from '@angular/core';
import {Suggest} from "../interfaces/suggest";

@Pipe({
  name: 'suggestTraited'
})
export class SuggestTraitedPipe implements PipeTransform {
  transform(suggest: Suggest) {
    return `${suggest?.subject?.title} || ${suggest?.date_butoir?.toLocaleString('fr-FR',{weekday:'long',year:'numeric',month:'long',day:'numeric',timeZone:"Europe/Paris", hour:"numeric",minute:"numeric"})} || ${suggest?.classe?.title}`;
  }
}
