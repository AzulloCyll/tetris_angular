import { Pipe, PipeTransform } from '@angular/core';
import { LogData } from './game/game.component';

@Pipe({
  name: 'filterByAction',
})
export class FilterByActionPipe implements PipeTransform {
  transform(items: Array<LogData>, optionSelected: string): Array<LogData> {
    if (optionSelected === 'All') {
      return items;
    } else {
      let filteredArray = items.filter(
        (item) => item.action === optionSelected
      );
      return filteredArray;
    }
  }
}
