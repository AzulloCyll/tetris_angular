import { Pipe, PipeTransform } from '@angular/core';

import { hiScoresData } from '../../src/app/game/modal2/modal2.component';

@Pipe({
  name: 'sortByScore',
})
export class SortByScorePipe implements PipeTransform {
  transform(
    items: Array<hiScoresData>,
    sortDirectionDown: boolean
  ): Array<hiScoresData> {
    if (sortDirectionDown) {
      return items.sort((a, b) => a.score - b.score);
    } else {
      return items.sort((a, b) => b.score - a.score);
    }
  }
}
