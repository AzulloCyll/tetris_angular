import { Pipe, PipeTransform } from '@angular/core';
import { LogData } from './game/game.component';

@Pipe({
  name: 'sortBy',
})
export class SortByPipe implements PipeTransform {
  transform(
    items: Array<LogData>,
    sortByTimestampUP?: boolean
  ): Array<LogData> {
    if (sortByTimestampUP) {
      return items.sort((a, b) => a.timeStamp - b.timeStamp);
    } else {
      return items.sort((a, b) => b.timeStamp - a.timeStamp);
    }
  }
}
