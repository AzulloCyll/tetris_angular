import { Pipe, PipeTransform } from '@angular/core';

import { hiScoresData } from '../../src/app/game/modal2/modal2.component';

@Pipe({
	name: 'sortByScore'
})
export class SortByScorePipe implements PipeTransform {
	transform(
		items: Array<hiScoresData>,
		sortDirectionDown: boolean,
		sortByPlayerName?: boolean,
		playerName?: string
	): Array<hiScoresData> {
		let result = items;

		if (sortByPlayerName) {
			result = result.filter((player) => player.name === playerName);
		}

		if (sortDirectionDown) {
			result = result.sort((a, b) => a.score - b.score);
		} else {
			result = result.sort((a, b) => b.score - a.score);
		}

		return result;
	}
}
