import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { hiScoresData } from 'src/app/game/modal2/modal2.component';

@Injectable({
	providedIn: 'root'
})
export class HiscoresService {
	constructor(private _http: HttpClient) {}

	load() {
		const URL = 'http://localhost:55000/tetris';
		return this._http.get<Array<hiScoresData>>(URL, {
			headers: { accept: 'application/json' }
		});
	}

	check(token: string) {
		const URL = 'http://localhost:55000/check-token';
		const body = { 'auth-token': token };
		return this._http.post(URL, body);
	}

	send(token: string, playerName: string, score: number) {
		const URL = 'http://localhost:55000/scores';
		const body = {
			name: playerName,
			game: 'tetris',
			score: score
		};
		return this._http.post(URL, body, {
			headers: {
				'auth-token': token
			}
		});
	}
}
