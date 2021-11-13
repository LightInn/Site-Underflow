import {Pipe, PipeTransform} from '@angular/core';
import {Suggest} from "../interfaces/suggest";

@Pipe({
  name: 'suggestTraited'
})
export class SuggestTraitedPipe implements PipeTransform {
  // personalized pipe to display suggestions
  transform(suggest: Suggest) {
    return `${suggest?.title} || ${suggest?.subject?.title} || ${suggest?.classe?.title}`;
  }
}
